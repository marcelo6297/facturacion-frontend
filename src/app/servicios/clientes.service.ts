import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Cliente } from './../modelo/cliente';
import { Tipo } from './../modelo/cliente';
import { query } from '@angular/core/src/animation/dsl';

@Injectable()
export class ClientesService {

  
  private clientesUrl = 'api/cliente';
  private query = '/search?search=';
  private tiposUrl = this.clientesUrl + '/tipos';
  
  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.clientesUrl);
  }


  findAll(search: string): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.clientesUrl + this.query + search);
  }
  
  getAllTipos(): Observable<Tipo[]> {
      return this.http.get<Tipo[]>(this.tiposUrl);
  }

  saveOrUpdate(item: Cliente) {
    return this.http.post(this.clientesUrl, item);
  }

}
