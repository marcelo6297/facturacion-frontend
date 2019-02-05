import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {Compra, CompraDetalle} from '../modelo/Compra';

@Injectable()
//
export class ComprasService {

  private  urls = {
   compraUrl    : 'api/compras',
   compraDetalleUrl    : 'api/compraDetalles'
     
  }
  
    
   constructor(private http: HttpClient
   ) { }
  
  getAll(): Observable<Compra[]> {
    // return of(CLIENTES);
      return this.http.get<Compra[]>(this.urls.compraUrl);
  }
 
  
  save(compra:Compra) : Observable<Compra> {
       return this.http.post<Compra>(this.urls.compraUrl + '/save', compra);
   }
   
   getById(id:number) : Observable<Compra>{
       return this.http.get<Compra>(this.urls.compraUrl + '/' + id);
   }

}
