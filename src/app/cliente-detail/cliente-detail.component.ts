import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientesService } from './../servicios/clientes.service';
import { Tipo, Cliente } from './../modelo/cliente';

@Component({
    selector: 'app-cliente-detail',
    templateUrl: './cliente-detail.component.html',
    styleUrls: ['./cliente-detail.component.css'],
    providers: [ClientesService]

})
export class ClienteDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute, private location: Location, private service: ClientesService, private fb: FormBuilder) { }

    tipos: string[];
    @Input() cliente: Cliente;
    showError: boolean;
    showMessage = false;
    message = "Guardado con exito!!!";
    isEditing = false;
    error: any;
    tipo: Tipo;
    formCliente: FormGroup;
    ngOnInit() {
        this.getTipos();
        //chequear si es nuevo o no 
        if (this.location.path() != "/clientes/new") {
            //esta editando
            const id = +this.route.snapshot.paramMap.get('id');
            this.isEditing = true;
            this.getOne(id);
        }
        this.cliente = new Cliente();
        this.createForm();
        

    }


    getTipos() {
        this.service.getAllTipos().subscribe(res => this.tipos = res);
    }

    back() {
        this.location.back();
    }

    private createForm() {
        this.formCliente = this.fb.group({
            id: [this.cliente.id],
            nombre: [this.cliente.nombre, Validators.required],
            apellido: [this.cliente.apellido],
            ruc: [this.cliente.ruc, Validators.required],
            activo: this.cliente.activo,
            direccion1: this.cliente.direccion1,
            direccion2: this.cliente.direccion2,
            fechaNacimiento: [new Date(this.cliente.fechaNacimiento)],
            telefono: [this.cliente.telefono],
            tipo: [this.cliente.tipo, Validators.required]
        });
    }

    saveOrUpdate() {
        //   this.cliente.tipo = this.tipo;

        this.service.saveOrUpdate(this.formCliente.value).subscribe(res => {
            console.log(res);
            this.showError = false;
            this.showMessage = true;
            if (!this.isEditing) {
                this.formCliente.reset();
            }
        }, err => {
            this.showError = true;
            this.error = err.error.message;
            console.log(err);
        });
    }

    //traer un cliente
    getOne(id: number) {
        this.service.getOne(id).subscribe(res => {
            this.cliente = res;
            this.createForm();
        });
    }

}
