import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientesService } from '../servicios/clientes.service';
import { Cliente } from '../modelo/cliente';





@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClientesService]
})
export class ClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['id', 'nombre', 'apellido', 'ruc', 'estado', 'tipo', 'acciones'];
  selectedCliente: Cliente;
  clientes: Cliente[];
  showMsg = false;

  constructor(private route: ActivatedRoute, private location: Location, private service: ClientesService) { }

  ngOnInit() {

    this.getClientes();

  }


  onSelect(cliente: Cliente) {
    this.selectedCliente = cliente;
  }


  getClientes(): void {
    this.service.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<Cliente>(data);
      //        this.dataSource.connect()
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



}
