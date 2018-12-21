import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';

@Injectable()
export class ComprasService {

  private compraUrl = 'api/compras' 
  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Compra[]> {
    // return of(CLIENTES);
      return this.http.get<Compra[]>(this.compraUrl);
  }

}
