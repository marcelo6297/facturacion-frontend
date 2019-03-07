import {Component, OnInit, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {debounceTime} from 'rxjs/operators/debounceTime';
import {Observable} from 'rxjs/Observable';

import {Venta} from '../modelo/venta'
import {Cliente} from '../modelo/cliente'
import {ClientesService} from '../servicios/clientes.service'
import {Globals} from '../globals'

@Component({
    selector: 'ventas-form',
    templateUrl: './ventas.form.html',
    providers: [ClientesService, Globals]
    //    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class VentasForm implements OnInit {


    form: FormGroup;
    clientes: Observable<Cliente[]>;
    selectedCliente: Cliente = new Cliente();
    tipoDocumentos = ["Factura","Recibo","Nota Credito","Presupuesto","Tickets"]
    constructor(
        private service: ClientesService,
        private global: Globals) 
    {
       
    }

    ngOnInit() {
        this.createForm();
                        
        this.form.get("cliente").valueChanges
            .pipe(debounceTime(this.global.duration.short))
            .subscribe(res => {
                if (res && res.id) {
                    this.selectedCliente = res
                }
                else {
                    this.clientes = this.service.findAll(res).pipe();
                }
            })
    }

    public getValue(): Venta {
        return this.form.value;
    }

    displayWith(cliente: Cliente): string {
        return cliente ? cliente.nombre + ', ' + cliente.apellido : '';
    }
    
    createForm(){
         this.form = new FormGroup({
             id: new FormControl(),
             cliente: new FormControl(null, Validators.required),
            condicionVenta: new FormControl(null, Validators.required),
            vendedor: new FormControl(null, Validators.required),
        //Tipo documento Recibo Factura, Nota Credito
            tipoDocumento: new FormControl(),
            numeroDocumento: new FormControl(null, Validators.required),
            fechaVenta: new FormControl(null, Validators.required),
    });
    }
    
    reset(){
        this.form.reset();
    }
    
    public setValues(data:Venta) {
        let value = {
            id: data.id,
            cliente: data.cliente,
            condicionVenta: data.condicionVenta,
            vendedor: data.vendedor,
            tipoDocumento: data.tipoDocumento,
            numeroDocumento: data.numeroDocumento,
            fechaVenta: data.fechaVenta,
        }
        this.form.setValue(value)
    }
}