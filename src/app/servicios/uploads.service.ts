import { Cliente } from './../modelo/cliente';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Producto } from '../modelo/Producto';



@Injectable()
export class UploadsService {

  constructor(private http: HttpClient) { }

  private apiUrl :any = 'api/uploads'; 

  /**
   * Enviar archivos al servidor
   */
  postClienteFile(file: File, url: any): Observable<Cliente[]> {
        //Averiguar desde donde esta siendo invocado
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<Cliente[]>(this.apiUrl + url, formData);
    
      }

}
