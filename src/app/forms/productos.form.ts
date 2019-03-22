import { Component, OnInit, Input,ViewChild, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs/Subscription';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from './../servicios/productos.service';
import { Producto } from '../modelo/Producto';
import { Globals } from '../globals';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos.form.html',
  styleUrls: ['./../app.component.css']
  
})
export class ProductosForm implements OnInit, OnDestroy {
    
    
    @Input() producto: Producto;
    
    
    formProducto: FormGroup;
    isEditing      = false;
    subscripciones: Subscription[]=[];
   
    ivas = [0,5,10];
    
    constructor(
        private fb: FormBuilder
    ) { }
    
    ngOnInit()  {
               
        
        this.createForm();
        
        
        
        
    }
    


    
    //Metodo para crear el formulario
    private createForm() {
        this.formProducto = this.fb.group({
            id: [this.producto.id],
            codigo: [this.producto.codigo, Validators.required],
            nombre: [this.producto.nombre, Validators.required],
            descripcion: [this.producto.descripcion ],
            notas: [this.producto.notas ],
            activo: [this.producto.activo],
            
            precioCompra: [this.producto.precioCompra ],
            porcenGan: [this.producto.porcenGan ],
            precioVenta: [this.producto.precioVenta],
            porcenIva: [this.producto.porcenIva],
            stockInicial: [this.producto.stockInicial],
            stockMinimo: [this.producto.stockMinimo],
            stockPreOrden: [this.producto.stockPreOrden],
    
        });
        this.setListeners();
    }
    

    
    private setListeners() {
        //Setear los listeners
        this.subscripciones.push(this.formProducto.get('precioCompra').valueChanges.subscribe(data => {
            
            const porcenGan: number = this.formProducto.get('porcenGan').value
            if (porcenGan != null) {
                var precioVenta: number = data * (1 + porcenGan / 100.0);
                this.formProducto.get('precioVenta').setValue(precioVenta, {emitEvent: false})
            }

        }));
        
        this.subscripciones.push(this.formProducto.get('precioVenta').valueChanges.subscribe(data => {
            
            const precioCompra: number = this.formProducto.get('precioCompra').value
            if (precioCompra != null) {
                var porcenGan: number = (data - precioCompra) * 100 / precioCompra;
                this.formProducto.get('porcenGan').setValue(porcenGan, {emitEvent: false})
            }


        }));
        
        this.subscripciones.push(this.formProducto.get('porcenGan').valueChanges.subscribe(data => {

            const precioCompra: number = this.formProducto.get('precioCompra').value
            if (precioCompra != null) {
                var precioVenta: number = precioCompra * (1 + data / 100.0);
                this.formProducto.get('precioVenta').setValue(precioVenta, {emitEvent: false});
            }

        }));
    }
    
    
    
    value():any {
        return this.formProducto.value;
    }
    
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
    
    reset(){
        this.formProducto.reset()
    }
}


