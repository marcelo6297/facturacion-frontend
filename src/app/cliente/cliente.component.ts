
import {Component, OnInit, ViewChild, Input, Inject} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatCheckboxChange,
    MatButton,
    MatSnackBar,
    MatDialog,
    MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig
} from '@angular/material';

import {ClientesService} from '../servicios/clientes.service';
import {Cliente} from '../modelo/cliente';
import {BorrarDialog} from '../dialog/borrar.dialog';

@Component({
    selector: 'cliente-form',
    templateUrl: './cliente-form.html',
    providers: [ClientesService]
    //    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class ClienteForm implements OnInit {

    @Input() cliente: Cliente = new Cliente();
    @Input() tipos: string[];
    @Input() isEditing: boolean;
    form: FormGroup;

    constructor(private fb: FormBuilder, private service: ClientesService) {

    }
    ngOnInit() {
        console.log("ClienteForm OnInit")
        this.createForm(this.cliente);
        
    }

    createForm(c: Cliente) {
        this.form = this.fb.group({
            id: [c.id],
            nombre: [c.nombre, Validators.required],
            apellido: [c.apellido],
            ruc: [c.ruc, Validators.required],
            activo: c.activo,
            direccion1: c.direccion1,
            direccion2: c.direccion2,
            fechaNacimiento: [new Date(c.fechaNacimiento)],
            telefono: [c.telefono],
            tipo: [c.tipo, Validators.required]
        });
        this.form.get("ruc").valueChanges.pipe(debounceTime(700)).subscribe(val => {

            this.service.findByRuc(val).subscribe(res => {
                if (res) {
                    this.form.get("ruc").setErrors({"notUnique": true});
                }
            }, error => {
                console.log(error);
            });

        });
    }
}

@Component({
    selector: 'cliente-form-dialog',
    templateUrl: './cliente-form.dialog.html',
    providers: [ClientesService]
})

export class ClienteFormDialog implements OnInit {
    
    @ViewChild(ClienteForm) clienteForm: ClienteForm;
    cliente: Cliente;
    tipos: string[];
    isEditing: boolean;
    successMessage = "Guardado con exito!!!";
    errorMessage = "No se pudo guardar, verifique: RUC o Tipo de Cliente u otro, \n\
Información adicional: ";

    constructor(private dialogRef: MatDialogRef<ClienteFormDialog>,
        @Inject(MAT_DIALOG_DATA) data, 
        private service: ClientesService,
        private snackBar: MatSnackBar
    ) {

        this.cliente = data.cliente;
        this.isEditing = data.isEditing;
    }

    ngOnInit() {
        console.log("ClienteFormDialog OnInit")
        //            this.createForm();
        this.service.getAllTipos().subscribe(res => {
            this.tipos = res;
        });
    }

    saveOrUpdate() {
        this.service.saveOrUpdate(this.clienteForm.form.value).subscribe(
            res => {this.dialogRef.close(true)},
            error => {this.showSnack(this.errorMessage + error.message)}
            );
    }
//    private createForm()     {

//        this.form = this.service.createForm(this.client    e);
//        this.form = this.fb.grou    p({
//            id: [this.cliente.i    d],
//            nombre: [this.cliente.nombre, Validators.require    d],
//            apellido: [this.cliente.apellid    o],
//            ruc: [this.cliente.ruc, Validators.require    d],
//            activo: this.cliente.acti    vo,
//            direccion1: this.cliente.direccio    n1,
//            direccion2: this.cliente.direccio    n2,
//            fechaNacimiento: [new Date(this.cliente.fechaNacimiento    )],
//            telefono: [this.cliente.telefon    o],
//            tipo: [this.cliente.tipo, Validators.requir    ed]
//            });
//    }

    showSnack(message: any) {
        this.snackBar.open(message, "", {duration: 3000})
    }
}





@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css'],
    providers: [ClientesService]
})
export class ClienteComponent implements OnInit {

    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    borrarDisabled = true;

    dataSource: MatTableDataSource<Cliente>;
    displayedColumns = ['id', 'nombre', 'apellido', 'ruc', 'direccion1', 'direccion2', 'estado', 'tipo', 'fechaNacimiento', 'createdOn', 'acciones'];
    selectedCliente: Cliente;
    clientes: Cliente[];
    ids: number[] = [];
    showMsg = false;
    successMessage = "Guardado Ok!!!"
    errorMessage = "No se pudieron eliminar los elementos seleccionados, información adicional: "

    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private service: ClientesService) {}

    ngOnInit() {
        this.buildMaterialTable();
        this.getClientes();

    }


    onSelect(cliente: Cliente) {
        this.selectedCliente = cliente;
    }

    aBorrar(evt: MatCheckboxChange, id) {

        if (evt.checked) {
            this.ids.push(id);
        }
        else {
            // Item to remove
            this.ids = this.ids.filter(obj => obj !== id);
        }

        this.borrarDisabled = !(this.ids.length > 0);


    }

    getClientes(): void {
        this.service.getAll().subscribe(data => {

            this.dataSource.data = data;
            //this.dataSource = new MatTableDataSource<Cliente>(data);
            //        this.dataSource.connect()
            //this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
        });
    }

    // Metodo para borrar
    borrar() {
        const dialogRef = this.dialog.open(BorrarDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {

                this.service.delete(this.ids).subscribe(res => {
                    this.getClientes();
                    this.ids = [];
                    this.borrarDisabled = true
                }, error => {
                    this.showSnack(this.errorMessage + error.message);
                });
            }

        });

    }

    export() {
        window.open("api/clientes/exportar");
    }

    showSnack(message: any) {
        this.snackBar.open(message, "OK", {duration: 3000})
    }

    nuevo() {
        const dialogConfig = new MatDialogConfig();
        const cliente = new Cliente();
        dialogConfig.data = {cliente: cliente, isEditing: false}
        const dialogRef = this.dialog.open(ClienteFormDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.showSnack(this.successMessage)
                this.getClientes();
            }
        }, error => {

        })
    }

    edit(id: number) {
        const dialogConfig = new MatDialogConfig();
        for (var i = 0; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i].id == id) {
                dialogConfig.data = {
                    cliente: this.dataSource.data[i],
                    isEditing: true
                }
            }
        }
        const dialogRef = this.dialog.open(ClienteFormDialog, dialogConfig);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.showSnack(this.successMessage)
                this.getClientes();
            }
        }, error => {

        })
    }

    private buildMaterialTable() {
        this.dataSource = new MatTableDataSource<Cliente>();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}

