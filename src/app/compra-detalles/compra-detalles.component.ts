import { Component, OnInit, Input, Output , OnDestroy } from '@angular/core';
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
    
  displayedColumns = [ 'nombre','codigo', 'cantidad', 'precioCompra','precioVenta', 'iva', 'subTotalIva', 'subTotal', 'acciones'];
  
  dataSource: MatTableDataSource<CompraDetalle> ;
  
  subTotalIva: any;
  subTotal: any;
  constructor() { }

  ngOnInit() {
      console.log("ngInit compra-detalles");
      this.dataSource = new MatTableDataSource<CompraDetalle>(  );
      this.detalles.forEach(data => {
          this.dataSource.data = data;
      })
//      this.detalles.forEach(value => {
//        this.dataSource.data = value
//        console.log("ngInit forEach");
//        console.log(value);
//        
//        });
      
      
  }
  
  ngOnDestroy() {}
  
  

}
