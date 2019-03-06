import {Component, OnInit, OnDestroy, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {Producto} from '../modelo/Producto'
import {VentaDetalle} from '../modelo/venta'
import {ProductosService} from '../servicios/productos.service'

@Component({
    selector: 'detalle-venta-form',
    templateUrl: './detalle-venta.form.html',
    providers: [ProductosService]
    //    styleUrls: ['./../cliente-detail/cliente-detail.component.css'],
})

export class DetalleVentaForm implements OnInit, OnDestroy{
    
    
    form = new FormGroup({
        id: new FormControl(),
        producto: new FormControl(null,Validators.required),
        codigo: new FormControl(),
        nombre: new FormControl(),
        descripcion: new FormControl(),
        cantidad: new FormControl(null,[Validators.required]),
        precio: new FormControl(),
        porcenDesc: new FormControl(null,[Validators.required, Validators.min(0), Validators.max(40)]),
        porcenIva: new FormControl(),
        
    });
    
    
    idProductos:string[]=[];
    selectedProducto: Producto;
    producto$ :Observable<Producto[]>
    suscripciones: Subscription[]= [];
    
    constructor(private srvc:ProductosService) {
        this.selectedProducto = new Producto()
    }
    ngOnInit(){
        this.suscripciones.push( this.form.get("producto").valueChanges
            .pipe()
            .subscribe(res => {
                if (res && res.id) {
                    this.selectedProducto = res
                    this._setProducto(res)
                }
                else {
                    this.producto$ = this.srvc.search(res, this.idProductos).pipe(); 
                }
            })
            )
    }
    
    ngOnDestroy () {
        for (var i = 0; i < this.suscripciones.length;i++)
            this.suscripciones[i].unsubscribe()
            
    }
    
    public getValue() {
        console.log(this.form)
        return this.form.value;
    }
    
    public displayWith(p:Producto):string {
        return p ? p.codigo + ', ' + p.nombre : '';
    }
    
    private _setValoresForm(vd: VentaDetalle){
        let edit = {
            id: vd.id,
            producto: vd.producto,
            codigo: vd.codigo,
            nombre: vd.nombre,
            descripcion: vd.descripcion,
            cantidad: vd.cantidad,
            precio: vd.precio,
            porcenDesc: vd.porcenDesc,
            porcenIva: vd.porcenIva
        }
        this.form.setValue(edit)
    }
    
    private _setProducto(p: Producto){
         const evt = {emitEvent: false}
        this.form.get("nombre").setValue(p.nombre,evt)
        this.form.get("codigo").setValue(p.codigo,evt)
        this.form.get("descripcion").setValue(p.descripcion,evt)
        this.form.get("precio").setValue(p.precioVenta,evt)
        this.form.get("porcenIva").setValue(p.porcenIva,evt)
        this.form.get("porcenDesc").setValue(p.porcenDesc,evt)
    }
    
    edit(vd: VentaDetalle){
        this._setValoresForm(vd)
    }
    
    reset(){
        this.form.reset();
    }
}