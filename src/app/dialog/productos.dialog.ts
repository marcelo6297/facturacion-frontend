/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import {Component, OnInit, Input, ViewChild, OnDestroy, Inject} from '@angular/core';
import {Location} from '@angular/common';
import {MatSnackBar, MAT_DIALOG_DATA} from '@angular/material';
import {Subject} from "rxjs/Subject"


import {ActivatedRoute} from '@angular/router';

import {ProductosService} from './../servicios/productos.service';
import {ProductosForm} from '../forms/productos.form';
import {Producto} from '../modelo/Producto';
import {Globals} from '../globals';



@Component({
    selector: 'productos-dialog',
    templateUrl: './productos-dialog.html',
    providers: [ProductosService, Globals]
})

export class ProductosDialog implements OnInit{
    

    @ViewChild(ProductosForm) productosForm: ProductosForm;
    producto: Producto 
    producto$: Subject<Producto>
    isEditing: boolean
    totalAgregado:number = 0
    actualizar:boolean = false;
    constructor(
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data, 
        private route: ActivatedRoute,
        private location: Location,
        private _srvc: ProductosService,
        private global: Globals,
    ) 
    {
        this.producto = data.producto;
        this.isEditing = data.isEditing;
        this.producto$ = new Subject();
    }
    
    ngOnInit(): void {
        
    }


    private _findOne(id: number) {
        this._srvc.getById(id).subscribe(res => {
//            this.producto = res;

        })
    }
    
    private _showSnack(message:any){
        this.snackBar.open(message, "OK", {duration: this.global.duration.long})
    }

    saveOrUpdate($event) {

        this._srvc.save(this.productosForm.value()).subscribe(res => {
            this._showSnack(this.global.messageSuccess.guardar)
//            this._srvc.updateStock().subscribe(res => {
//                console.log("Update Stock")
//                console.log(res)
//            });
            this.actualizar= true;
            this.totalAgregado++;
            this.productosForm.reset();
        }, error => {
            this._showSnack(this.global.messageError.guardar + error.message)
            console.log("No Guardado")
            console.log(error)
        });
    }
}