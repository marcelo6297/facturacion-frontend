import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import  { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';



import { Cliente} from './cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  providers: [ClientesService]
})
export class ClienteComponent implements OnInit {

  
  dataSource: MatTableDataSource<Cliente> ;
  displayedColumns = ['id', 'nombre', 'apellido', 'estado', 'acciones'];
  selectedCliente: Cliente ;
  clientes : Cliente[];
  showMsg = false;

  constructor(private route: ActivatedRoute, private location: Location, private service: ClientesService) {}
  
  ngOnInit() { 
    
    this.getClientes();
    
  }
  
  
  onSelect(cliente: Cliente) {
      this.selectedCliente = cliente;
  }
  

  getClientes(): void {
     this.service.getAll().subscribe(data => 
      {
        this.dataSource = new MatTableDataSource<Cliente>(data);
//        this.dataSource.connect()
      });
  }
  
  

}
