import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from './../servicios/productos.service';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-productosNew',
  templateUrl: './productosNew.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosNewComponent implements OnInit {
    
    titulo = "Hola";
    formProducto: FormGroup;
    producto: Producto;
    isEditing      = false;
    errorMessage   = "No se pudo guardar, verifique que los datos cargados sean validos. \n\
                No se pueden repetir CODIGO ni NOMBRE, informacion adicional: ";
    successMessage = "Guardado"                
    showSuccess    = false
    showError      = false
    ivas = [0,5,10];
    
    constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private location: Location, private service: ProductosService, private fb: FormBuilder) { }
    
    ngOnInit()  {
        
        
        
        if (this.location.path() != "/productos/new") {
            //esta editando
            const id = +this.route.snapshot.paramMap.get('id');
            this.isEditing = true;
            this.findOne(id);
        }
        
        
        this.producto = new Producto();
        this.createForm();
        
        
        
        
    }
    
    saveOrUpdate($event) {
        this.showError   = false;
        this.showSuccess = false;
        this.service.save(this.formProducto.value).subscribe(res => {
            this.showSnack(this.successMessage)
            this.service.updateStock().subscribe(res => {
                console.log("Update Stock")
                console.log(res)
            });
        }, error => {
            this.showSnack(this.errorMessage + error.message)
            console.log("No Guardado")
            console.log(error)
        });
    }
    back() {
        this.location.back();
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
            iva: [this.producto.iva],
            stockInicial: [this.producto.stockInicial],
            stockMinimo: [this.producto.stockMinimo],
            stockPreOrden: [this.producto.stockPreOrden],
    
        });
        this.setListeners();
    }
    
    private findOne(id:number){
        this.service.getById(id).subscribe(res => {
            this.producto = res;
            this.createForm();
        })
    }
    
    private setListeners() {
        //Setear los listeners
        this.formProducto.get('precioCompra').valueChanges.subscribe(data => {
            
            const porcenGan: number = this.formProducto.get('porcenGan').value
            if (porcenGan != null) {
                var precioVenta: number = data * (1 + porcenGan / 100.0);
                this.formProducto.get('precioVenta').setValue(precioVenta, {emitEvent: false})
            }

        });
        
        this.formProducto.get('precioVenta').valueChanges.subscribe(data => {
            
            const precioCompra: number = this.formProducto.get('precioCompra').value
            if (precioCompra != null) {
                var porcenGan: number = (data - precioCompra) * 100 / precioCompra;
                this.formProducto.get('porcenGan').setValue(porcenGan, {emitEvent: false})
            }


        });
        
        this.formProducto.get('porcenGan').valueChanges.subscribe(data => {

            const precioCompra: number = this.formProducto.get('precioCompra').value
            if (precioCompra != null) {
                var precioVenta: number = precioCompra * (1 + data / 100.0);
                this.formProducto.get('precioVenta').setValue(precioVenta, {emitEvent: false});
            }

        });
    }
    
    showSnack(message:any){
        this.snackBar.open(message,"OK" ,{duration: 3500})
    }
}


