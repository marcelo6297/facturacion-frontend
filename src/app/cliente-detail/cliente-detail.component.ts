
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';



import { ClientesService } from './../servicios/clientes.service';
import { Tipo, Cliente } from './../modelo/cliente';
import { ClienteForm } from './../cliente/cliente.component'

@Component({
    selector: 'app-cliente-detail',
    templateUrl: './cliente-detail.component.html',
    styleUrls: ['./cliente-detail.component.css'],
    providers: [ClientesService]

})
export class ClienteDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private location: Location, 
    private service: ClientesService, 
    private sb: MatSnackBar) { }

    @ViewChild(ClienteForm) clienteForm: ClienteForm;
    @Input() cliente: Cliente;
    tipos: string[];
    
    successMessage = "Guardado con exito!!!";
    errorMessage = "No se pudo guardar, verifique: RUC o Tipo de Cliente u otro, \n\
Información adicional: ";
    isEditing = false;
    
    tipo: Tipo;
 
    ngOnInit() {
        this.getTipos();
        //chequear si es nuevo o no 
        this.cliente = new Cliente();
        if (this.location.path() != "/clientes/new") {
            //esta editando
            const id = +this.route.snapshot.paramMap.get('id');
            this.isEditing = true;
            this.getOne(id);
            
        }
        
//        this.form = this.service.createForm(this.cliente)
//        
//        this.form.get("ruc").valueChanges.pipe(debounceTime(700)).subscribe(val => {
//
//            this.service.findByExample(val).subscribe(res => {
//                if (res) {
//                    this.form.get("ruc").setErrors({ "notUnique": true });
//                }
//            },error => {
//                console.log(error);
//            });
//
//        });
        
         
    }


    getTipos() {
        this.service.getAllTipos().subscribe(res => this.tipos = res);
    }

    back() {
        this.location.back();
    }
    getOne(id: number) {
        this.service.getOne(id).subscribe(res => {
            this.cliente = res;
            this.clienteForm.createForm(res);
            
        });
    }
    
    saveOrUpdate() {
            this.service.saveOrUpdate(this.clienteForm.form.value).subscribe(
                res => {this.sb.open(this.successMessage,"", {duration: 3000})},
                error => {this.sb.open(this.errorMessage+ error.message,"", {duration: 3000})}
            );
        }


}
