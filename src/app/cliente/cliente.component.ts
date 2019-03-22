
import {Component, OnInit,OnDestroy ,ViewChild, Input, Inject} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {debounceTime} from 'rxjs/operators/debounceTime';
import {Subscription} from 'rxjs/Subscription';

import {
    MatTableDataSource,
    MatPaginator,
    MatSort,
    MatCheckboxChange,
    MatSnackBar,
    MatDialog,
    MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig
} from '@angular/material';

import {ClientesService} from '../servicios/clientes.service';
import {Cliente} from '../modelo/cliente';
import {BorrarDialog} from '../dialog/borrar.dialog';
import {Globals} from '../globals'

@Component({
    selector: 'cliente-form',
    templateUrl: './cliente-form.html',
    providers: [ClientesService  ],
    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class ClienteForm implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()});
    }

    @Input() cliente: Cliente = new Cliente();
    @Input() tipos: string[];
    @Input() isEditing: boolean;
    form: FormGroup;
    subscripciones: Subscription[]=[];

    constructor(
        private fb: FormBuilder, 
        private service: ClientesService,
        private global: Globals
        ) {

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
        
        this.subscripciones.push(this.form.get("ruc").valueChanges.pipe(
            debounceTime(this.global.duration.short)).subscribe(val => {

            this.service.findByRuc(val).subscribe(res => {
                if (res) {
                    this.form.get("ruc").setErrors({"notUnique": true});
                }
            }, error => {
                console.log(error);
            });

        }));
    }
}

@Component({
    selector: 'cliente-form-dialog',
    templateUrl: './cliente-form.dialog.html',
    providers: [ClientesService, Globals]
})

export class ClienteFormDialog implements OnInit {
    
    @ViewChild(ClienteForm) clienteForm: ClienteForm;
    cliente: Cliente;
    tipos: string[];
    isEditing: boolean;


    constructor(private dialogRef: MatDialogRef<ClienteFormDialog>,
        @Inject(MAT_DIALOG_DATA) data, 
        private service: ClientesService,
        private snackBar: MatSnackBar,
        private global: Globals
    ) {

        this.cliente = data.cliente;
        this.isEditing = data.isEditing;
        console.log(this.global)
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
            error => {this.showSnack(this.global.messageError.guardar + error.message)}
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
        this.snackBar.open(message, "", {duration: this.global.duration.long})
    }
}





@Component({
    selector: 'app-cliente',
    templateUrl: './cliente.component.html',
    styleUrls: ['./cliente.component.css'],
    providers: [ClientesService, Globals]
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
    
    
    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private service: ClientesService,
        private global: Globals
        ) {}

    ngOnInit() {
        this._buildMaterialTable();
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
                    this.showSnack(this.global.messageError.elimiar + error.message);
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
//        const dialogConfig = new MatDialogConfig();
        const cliente = new Cliente();
        let dialogData = {data : {cliente: cliente, isEditing: false}, width: '50%' }
        this._openDialod(dialogData);
    }

    edit(id: number) {
        let cliente;
        for (var i = 0; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i].id == id) {
                cliente = this.dataSource.data[i]
                break;
            }
        }
        let dialogData = {data : {cliente: cliente, isEditing: true}, width: '50%' }
        this._openDialod(dialogData)
    }

    private _buildMaterialTable() {
        this.dataSource = new MatTableDataSource<Cliente>();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    
    private _openDialod(dialogData:any){
        let mensajeOK, mensajeNoOK
        if (dialogData.data.isEditing) {
            mensajeOK = this.global.messageSuccess.editar;
            mensajeNoOK = this.global.messageError.editar;
        }
        else {
            mensajeOK = this.global.messageSuccess.guardar;
            mensajeNoOK = this.global.messageError.guardar;
        }
        const dialogRef = this.dialog.open(ClienteFormDialog, dialogData);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this.showSnack(mensajeOK)
                this.getClientes();
            }
        }, error => {
            this.showSnack(mensajeNoOK + error.message)
        })
    }
}

