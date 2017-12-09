import { Injectable } from '@angular/core';
import { ProductosPedidos } from '../modelo/ProductosPedidos';
import { ProductosPedidosMock } from './../mocks/productos-pedidos.mock';
import { ClientesService } from './clientes.service';



@Injectable()
export class FacturacionService {

  productosPedidos: ProductosPedidos[] = ProductosPedidosMock;
  
  constructor(private clienteService: ClientesService) { }

  getAllProductosPedidos(){
    return this.productosPedidos;
  }

  getAllClientes() {
      return this.clienteService.getAll();
  }


  findAllClientes(search) {
      return this.clienteService.findAll(search);
  }


}
