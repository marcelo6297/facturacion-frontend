import {Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import {Subject} from 'rxjs/Subject';

import {MatSnackBar} from '@angular/material'

import {VentasForm} from '../forms/ventas.form'
import {DetalleVentaForm} from '../forms/detalle-venta.form'
import {Venta, VentaDetalle} from '../modelo/venta'
import {VentasService} from '../servicios/ventas.service'
import {ClientesService} from '../servicios/clientes.service'
import {Globals} from './../globals'


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  providers: [VentasService, ClientesService, Globals],
  styleUrls: ['./ventas.component.css']
})

/**
 * En la version V0.1 se permite agregar valores duplicados de productos
 */
export class VentasComponent implements OnInit {

  @ViewChild(VentasForm) form: VentasForm
  @ViewChild(DetalleVentaForm) formDetalle: DetalleVentaForm
  venta$: Subject<Venta>;
  ventaDetalles$: Subject<VentaDetalle[]>;
  venta:Venta;
  isEditing=false;
  constructor(
      private _srvc:VentasService,
      private sb: MatSnackBar,
      private global:Globals,
      private route: ActivatedRoute, 
      private location: Location,
      
      ) 
      { 
      this.venta$ = new Subject();
      this.ventaDetalles$ = new Subject();
      this.venta = this._srvc.newVenta();
  }

  ngOnInit() {
      //determinar si esta editando o esta creando
      if (this.location.path() != "/ventas/new") {
            //esta editando
            const id = +this.route.snapshot.paramMap.get('id');
            this.getById(id);
            //desabilitar botones guardar!!!
        }
  }
  
  getById(id:number){
      this._srvc.getById(id).subscribe(res => {
          this.venta = res;
          this.form.setValues(res);
          this.venta$.next(this.venta);
          this.ventaDetalles$.next(this.venta.ventaDetalles);
          this.isEditing = true;
      })
  }
  
  onClick(){
      
  }
  
  getImpositivo$() {
      return this.venta$.asObservable()
  }
  
  agregarDetalle(){
      var det = this.formDetalle.getValue()
      
      this._calcularSubTotal(det)
      this._agregarDetalle(det);
      
      this.formDetalle.reset(); 
  }
  
  private _calcularSubTotal(det: VentaDetalle){
      
      if (det.porcenDesc) {
          det.montoDesc = det.cantidad * det.precio *  det.porcenDesc /100;
          det.subTotal = det.cantidad * det.precio - det.montoDesc;
      }
      else {
          det.subTotal = det.cantidad * det.precio
          det.montoDesc = 0
      }
        det.montoIva = det.subTotal * det.porcenIva / 100;
        
        return det;
  }
  
  private _agregarDetalle(det: VentaDetalle) {
        
        switch (det.porcenIva) {
            case 0:
                this.venta.totalExentas += det.subTotal;
                break;
            case 5:
                this.venta.totalIva5 += det.subTotal + det.montoIva;
                break;
            case 10:
                this.venta.totalIva10 += det.subTotal + det.montoIva;
                break;
        }
        this.venta.totalDesc += det.montoDesc;
        this.venta.totalGeneral = this.venta.totalExentas +
        this.venta.totalIva5 + this.venta.totalIva10;
        this.venta.ventaDetalles.push(det);
        this.venta$.next(this.venta)
        this.ventaDetalles$.next(this.venta.ventaDetalles);
        
    }
    
    private _removerDetalle(det: VentaDetalle) {
        const detalles = this.venta.ventaDetalles;
        
        if (detalles.includes(det)) {
            detalles.splice(detalles.indexOf(det), 1)
//            this.idProductos.splice(
//                this.idProductos.indexOf(det.producto.id.toString()),1
//            );
            this.venta.ventaDetalles = detalles;
        }

        switch (det.porcenIva) {
            case 0:
                this.venta.totalExentas -= det.subTotal;
                break;
            case 5:
                this.venta.totalIva5 -= det.subTotal + det.montoIva;
                break;
            case 10:
                this.venta.totalIva10 -= det.subTotal + det.montoIva;
                break;
        }
        
        this.venta.totalDesc -= det.montoDesc;
        this.venta.totalGeneral = this.venta.totalExentas +
        this.venta.totalIva5 + this.venta.totalIva10;
        this.venta$.next(this.venta);
        this.ventaDetalles$.next(this.venta.ventaDetalles);
        
    }
    
    getVentaDetalles$(){
        return this.ventaDetalles$.asObservable();
    }
    
    borrar(item: VentaDetalle) {
        this._removerDetalle(item);
    }
    
    editar(item: VentaDetalle) {
        this.formDetalle.edit(item)
        this._removerDetalle(item);
    }
    
    guardar(){
        let detalles = this.venta.ventaDetalles;
        this.venta = this.form.getValue();
        this.venta.ventaDetalles = detalles;
        this._srvc.save(this.venta).subscribe(
            res => {this._showMsg(true)}, 
            res => {this._showMsg(false, res.error.message)}
        )
    }
    
    private _showMsg(success: boolean, msg?) {
        if (success) {
            this.sb.open(this.global.messageSuccess.guardar, "", {duration: this.global.duration.long})
        }
        else {
            this.sb.open(this.global.messageError.guardar +msg, "", {duration: this.global.duration.medium})
        }
    }
    
    detalleInvalido():boolean{
        return this.formDetalle.form.invalid || this.formDetalle.cantidadInvalid();
    }
    
    facturaInvalida():boolean{
        return this.form.form.invalid;
    }

}
