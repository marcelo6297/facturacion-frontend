import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatPaginator, MatSort, MatCheckboxChange , MatButton} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientesService } from '../servicios/clientes.service';
import { Cliente } from '../modelo/cliente';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClientesService]
})
export class ClienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  borrarDisabled = true;

  dataSource: MatTableDataSource<Cliente>;
  displayedColumns = ['id', 'nombre', 'apellido', 'ruc', 'estado', 'tipo', 'fechaNacimiento', 'createdOn', 'acciones'];
  selectedCliente: Cliente;
  clientes: Cliente[];
  ids: number[]= [];
  showMsg = false;

  constructor(private route: ActivatedRoute, private location: Location, private service: ClientesService) { }

  ngOnInit() {

    this.getClientes();

  }


  onSelect(cliente: Cliente) {
    this.selectedCliente = cliente;
  }

  aBorrar(evt: MatCheckboxChange, id) {
    
    if (evt.checked) {
      this.ids.push(id);
    }
    else {
       // Item to remove
      this.ids = this.ids.filter(obj => obj !== id);
    }
    
      this.borrarDisabled = !(this.ids.length > 0) ;
    
    
  }

  getClientes(): void {
    this.service.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource<Cliente>(data);
      //        this.dataSource.connect()
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

// Metodo para borrar
  borrar() {
    console.log(this.ids);
  }
}
