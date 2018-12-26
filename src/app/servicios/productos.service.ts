import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Producto } from '../modelo/Producto';
import {Compra, CompraDetalle} from '../modelo/Compra';

@Injectable()
export class ProductosService {

  private urls = {
      productosUrl : 'api/productos',
      productosSearchUrl : 'api/productos/search?search=',
      compraUrl    : 'api/compras',
      compraDetalleUrl    : 'api/compraDetalles'
      
  }
  
  constructor(private http: HttpClient) { }

  /**
   * Retorna la lista de productos desde el servidor
   */
  getAll(): Observable<Producto[]> {

    return this.http.get<Producto[]>(this.urls.productosUrl);
  }
  
  /**
   * Retorna la lista de compras
   */
  getComprasAll(): Observable<Compra[]> {
    // return of(CLIENTES);
      return this.http.get<Compra[]>(this.urls.compraUrl);
  }  
  /**
   * Retorna la lista de compras
   */
  search(search): Observable<Producto[]> {
    // return of(CLIENTES);
      return this.http.get<Producto[]>(this.urls.productosSearchUrl+search);
  }  
  /**
   * Enviar archivos al servidor
   */
  postFile(file: File): Observable<Producto[]> {

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Producto[]>(this.urls.productosUrl + '/upload', formData);

  }
  
  /**
   * Guardar Compras
   */
   save(compra:Compra) : Observable<Compra> {
       return this.http.post<Compra>(this.urls.compraUrl + '/save', compra);
   }

}
