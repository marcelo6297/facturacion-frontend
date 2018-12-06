import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { Cliente } from './../modelo/cliente';
import { Tipo } from './../modelo/cliente';
import { query } from '@angular/core/src/animation/dsl';
import { DataRepository } from './data-repository';

@Injectable()
export class ClientesService {

  
  private clientesUrl = 'api/clientes';
  private delteUrl = this.clientesUrl + '/delete';
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
  
  getAllTipos(): Observable<string[]> {
      return this.http.get<string[]>(this.tiposUrl);
  }

  getOne(id: number) {
    return this.http.get<Cliente>(this.clientesUrl + '/' + id);
  }

  saveOrUpdate(item: Cliente) {
    return this.http.post(this.clientesUrl, item);
  }

 
  delete(ids: number[]) {
    return this.http.post(this.delteUrl, ids);
  }

}
