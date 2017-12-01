import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CLIENTES } from './clientes-mock';
import { Cliente } from './cliente';

@Injectable()
export class ClientesService {

  
  private clientesUrl = 'api/cliente';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get<Cliente[]>(this.clientesUrl);
  }

}
