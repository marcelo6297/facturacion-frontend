import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';

import { ProductosPedidos } from './../modelo/ProductosPedidos';
import { ProductosService } from './../servicios/productos.service';
import { FacturacionService } from './../servicios/facturacion.service';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  providers: [FacturacionService]
})
export class FacturacionComponent implements OnInit {

  pedidosForm = new FormGroup({
    clienteCtrl:  new FormControl(),
    pedidoCtrl:  new FormControl(),

  });
  dataSource: MatTableDataSource<ProductosPedidos> ;
  displayedColumns = ['id', 'nombreProducto', 'cantidad', 'precio', 'iva', 'subTotalIva', 'subTotal', 'acciones'];
  pedidos: ProductosPedidos[];
  totalItems = 0;
  totalGeneral = 0;
  constructor(private service: FacturacionService) { }

  ngOnInit() {
    this.getPedido();
  }

  getPedido() {
    this.pedidos = this.service.getAllProductosPedidos();
    this.dataSource = new MatTableDataSource<ProductosPedidos>( this.pedidos );
    this.totalItems = 0;
    this.totalGeneral = 0;
    this.pedidos.forEach(element => {
      this.totalItems ++;
      this.totalGeneral = this.totalGeneral + element.subTotal;
    });
  }

}
