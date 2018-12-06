
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { ProductosService } from './../servicios/productos.service';
import { Producto } from '../modelo/Producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  dataSource: MatTableDataSource<Producto> ;
  displayedColumns = ['id', 'codigo','nombre', 'descripcion', 'precio', 'iva', 'acciones'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private servicios: ProductosService) { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.getAll();
  }

  /**
   * Retorna la lista de productos desde el servidor
   */
  getAll() {
    return this.servicios.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<Producto>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data);
    });
  }
}
