import { Injectable } from '@angular/core';
import { ProductosPedidos } from '../modelo/ProductosPedidos';
import { ProductosPedidosMock } from './../mocks/productos-pedidos.mock';

@Injectable()
export class FacturacionService {

  productosPedidos: ProductosPedidos[] = ProductosPedidosMock;
  
  constructor() { }

  getAllProductosPedidos(){
    return this.productosPedidos;
  }


}
