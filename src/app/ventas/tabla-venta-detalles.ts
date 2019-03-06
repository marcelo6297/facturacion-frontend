import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import {VentaDetalle} from '../modelo/venta'

@Component({
  selector: 'tabla-venta-detalles',
  templateUrl: './tabla-venta-detalles.html',
  styleUrls: ['./ventas.component.css']
})

export class TablaVentaDetalles implements OnInit , OnDestroy{
    
    
  @Input() detalles: Observable<VentaDetalle[]> ;
  
  @Output() onBorrar: EventEmitter<VentaDetalle>;
  @Output() onSelect: EventEmitter<VentaDetalle>;
  
  displayedColumns = [ 
    'nombre','codigo', 'cantidad', 
    'precio', 'excentas','iva5','iva10', 'montoDesc', 'acciones'];
    
    dataSource: MatTableDataSource<VentaDetalle> ;
    suscription: Subscription[]=[];
    
    constructor (){
        this.detalles = new Observable()
        this.onSelect = new EventEmitter()
        this.onBorrar = new EventEmitter()
    }
    ngOnInit(): void {
      this.dataSource = new MatTableDataSource<VentaDetalle>(  );
      console.log("TablaVentaDetalles: OnInit")
      this.suscription.push(this.detalles.subscribe(data => {
          this.dataSource.data = data;
          
      })   );
    }
    
    ngOnDestroy(): void {
        for (let i = 0; i < this.suscription.length ; i++)
            this.suscription[i].unsubscribe();
    }
    
    edit(item:VentaDetalle){
        this.onSelect.emit(item);
    }
    
    borrar(item) {
        this.onBorrar.emit(item)
    }
}
