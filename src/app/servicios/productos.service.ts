import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Producto } from '../modelo/Producto';

@Injectable()
export class ProductosService {

  private productosUrl = 'api/productos';
  constructor(private http: HttpClient) { }

  /**
   * Retorna la lista de productos desde el servidor
   */
  getAll(): Observable<Producto[]> {

    return this.http.get<Producto[]>(this.productosUrl);
  }

}
