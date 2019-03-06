import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';

import { ProductosPedidos } from '../modelo/ProductosPedidos';
import { ProductosPedidosMock } from './../mocks/productos-pedidos.mock';
import { ClientesService } from './clientes.service';

import {Venta, VentaDetalle} from '../modelo/venta'
import {Cliente} from '../modelo/cliente'
import {Producto} from '../modelo/producto'

class VentaImpl implements Venta {
    totalDesc: number=0;
    id: number;
    condicionVenta: string;
    cliente: Cliente;
    vendedor: string;
    tipoDocumento: string;
    numeroDocumento: string;
    fechaVenta: string;
    creadoEl: string;
    actualizadoEl: string;
    ventaDetalles: VentaDetalle[] = [];
    totalExentas: number=0;
    totalIva5: number=0;
    totalIva10: number=0;
    totalGeneral: number=0;
    
}

class VentaDetalleImpl implements VentaDetalle {
    id: number;
    venta: Venta;
    producto: Producto;
    codigo: string;
    nombre: string;
    descripcion: string;
    cantidad: number=0;
    precio: number=0;
    porcenDesc: number=0;
    montoDesc: number=0;
    porcenIva: number=0;
    montoIva: number=0;
    subTotal: number=0;
    
}

@Injectable()
export class VentasService {

  productosPedidos: ProductosPedidos[] = ProductosPedidosMock;
  
  private _url = {venta: 'api/ventas'}
  
  constructor(private clienteService: ClientesService,
  private http: HttpClient
  ) { }

  getAllProductosPedidos(){
    return this.productosPedidos;
  }

  getAllClientes() {
      return this.clienteService.getAll();
  }


  findAllClientes(search) {
      return this.clienteService.findAll(search);
  }
  
  getClienteSrvc(){
      return this.clienteService;
  }
  
  newVenta():Venta{
      return new VentaImpl();
  }
  newVentaDetalle():VentaDetalle{
      return new VentaDetalleImpl();
  }
  
  /**
   * Guardar una venta
   */
   
   save(v:Venta){
       return this.http.post<Venta>(this._url.venta, v);
   }
   
   /**
    * Consultar todos los registros
    */
    getAll(){
       return this.http.get<Venta[]>(this._url.venta); 
    }
    
    getById(id:number):Observable<Venta> {
        return this.http.get<Venta>(this._url.venta +'/'+ id); 
    }


}
