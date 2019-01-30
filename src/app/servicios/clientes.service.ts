import { Location } from '@angular/common'
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


import { Cliente } from './../modelo/cliente';

@Injectable()
export class ClientesService {

  
  private clientesUrl = 'api/clientes';
  private delteUrl = this.clientesUrl + '/delete';
  private query = '/search?search=';
  private ruc = this.clientesUrl +'/ruc';
  private tiposUrl = this.clientesUrl + '/tipos';
  private exportar = this.clientesUrl + '/exportar';
  
  constructor(private location: Location, private http: HttpClient) { }

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
  
  
  /**
   * Traer el archivo desde el servidor
   * Paso dos filtrar por IDS
   */
  getFile() {
      const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/json; charset=UTF-8'
      }),
      responseType: 'text' as 'text'
    };
      return this.http.get(this.exportar, httpOptions);
  }
  
  //Traer por ejemplos
  findByRuc(ruc):Observable<Boolean>{
      return this.http.get<Boolean>(this.ruc + '?ruc=' + ruc);
  }
  
}
