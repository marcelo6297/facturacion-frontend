import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange , MatButton} from '@angular/material';


import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';
import {ComprasService} from '../servicios/compras.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [ComprasService]
})
export class ComprasComponent implements OnInit {

  dataSource: MatTableDataSource<Compra>;
  displayedColumns = ['id', 'proveedor','fechaCompra','totalCompra', 'acciones'];
  compras: Compra[];
  borrarDisabled = true;
  ids: number[]= [];
  
  constructor(private service: ComprasService) { }
  ngOnInit() {
      this.getCompras();
  }
  
  getCompras(): void {
    this.service.getAll().subscribe(data => {
      
      
      this.dataSource = new MatTableDataSource<Compra>(data);
      //        this.dataSource.connect()
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    });
  }

}
