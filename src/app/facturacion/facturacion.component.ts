import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import { ClientesService } from './../servicios/clientes.service';
import { ProductosPedidos } from './../modelo/ProductosPedidos';
import { ProductosService } from './../servicios/productos.service';
import { FacturacionService } from './../servicios/facturacion.service';
import { Cliente } from '../modelo/cliente';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
  providers: [FacturacionService, ClientesService]
})
export class FacturacionComponent implements OnInit {

  pedidosForm = new FormGroup({
    cliente: new FormControl(),
    pedido:  new FormControl(),
    cantidad:  new FormControl(),
    precio:  new FormControl(),
    otro:  new FormControl(),

  });
  dataSource: MatTableDataSource<ProductosPedidos> ;
  displayedColumns = ['id', 'nombreProducto', 'cantidad', 'precio', 'iva', 'subTotalIva', 'subTotal', 'acciones'];
  pedidos: ProductosPedidos[];
  totalItems = 0;
  totalGeneral = 0;
  valor: string;
  clientes: Observable<Cliente[]>;
  filteredOptions: Observable<string[]>;

  constructor(private service: FacturacionService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ProductosPedidos>( this.pedidos );
    this.pedidosForm.get('cliente').valueChanges.subscribe(data => {
      // if (data.length > 3) {
        this.clientes = this.service.findAllClientes(data).pipe();
      // }
    });
    
    this.getPedido();
    this.getClientes();
    
  }

  filter(valor): string[] {
    // Este metodo tiene que traer los valores de la base de datos
    console.log('filter');
    this.valor = valor;
    return [];
  }

  getPedido() {
    this.pedidos = this.service.getAllProductosPedidos();
    this.dataSource.data = this.pedidos;
    this.totalItems = 0;
    this.totalGeneral = 0;
    this.pedidos.forEach(element => {
      this.totalItems ++;
      this.totalGeneral +=  element.subTotal;
    });
  }

  getClientes() {
    this.service.getAllClientes().subscribe(data => {
      // this.clientes = of (data);
    });
  }

  displayFn(cliente: Cliente): string {
    return cliente ? cliente.nombre + ', ' + cliente.apellido : '';
  }

}
