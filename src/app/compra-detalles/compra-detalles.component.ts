import { Component, OnInit, Input, Output , OnDestroy, EventEmitter  } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';


import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';

@Component({
  selector: 'app-compra-detalles',
  templateUrl: './compra-detalles.component.html',
  styleUrls: ['./compra-detalles.component.css']
})
export class CompraDetallesComponent implements OnInit, OnDestroy {

  
  @Input() detalles: Observable<CompraDetalle[]>;
  
  @Output() evtBorrar: EventEmitter<CompraDetalle>;
  @Output() onSelect: EventEmitter<CompraDetalle>;
  
    
  displayedColumns = [ 
    'nombre','codigo', 'cantidad', 'precioCompra',
    'precioVenta', 'excentas','iva5','iva10', 'acciones'];
  
  dataSource: MatTableDataSource<CompraDetalle> ;
  
  subTotalIva: any;
  subTotal: any;
  constructor() { 
      this.detalles = new Observable();
      this.evtBorrar = new EventEmitter();
      this.onSelect = new EventEmitter();
  }

  ngOnInit() {
      console.log("CompraDetallesComponent: onInit");
      this.dataSource = new MatTableDataSource<CompraDetalle>(  );
      this.detalles.subscribe(data => {
          this.dataSource.data = data;
          
      })   
      
  }
  
  ngOnDestroy() {}
  
  onBorrar(item) { 
      this.evtBorrar.emit(item); 
  }
  
  edit(item){
      this.onSelect.emit(item); 
  }
  

}
