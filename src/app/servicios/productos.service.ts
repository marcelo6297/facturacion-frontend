import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Producto } from '../modelo/Producto';
import {Compra, CompraDetalle} from '../modelo/Compra';

@Injectable()
export class ProductosService {

  private urls = {
      productosUrl : 'api/productos',
      productosUpdate : 'api/productos/updateStock',
      productosDeleteUrl : 'api/productos/delete',
      productosSearchUrl : 'api/productos/search'
      
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
  search(search, ids?:string[]): Observable<Producto[]> {
    // return of(CLIENTES);
      
      const options = {
      params: {
        'search': search,
        'ids': ids,
      }}
      return this.http.get<Producto[]>(this.urls.productosSearchUrl, options);
      
      
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
   * Guardar Producto
   */
   save(prod:Producto) : Observable<Producto> {
       return this.http.post<Producto>(this.urls.productosUrl, prod);
   }
   
   getById(id:number) : Observable<Producto>{
       return this.http.get<Producto>(this.urls.productosUrl + '/' + id);
   }
   
   delete(ids:number[]) {
       return this.http.post<Producto[]>(this.urls.productosDeleteUrl, ids);
   }
   
   //actualizar el stock
   updateStock() {
       return this.http.post(this.urls.productosUpdate, {});
   }

}
