import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';

import { Component, OnInit } from '@angular/core';

//Servicios
import { ProductosService } from './../servicios/productos.service';

@Component({
  selector: 'app-productos-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.css'],
  providers: [ProductosService]
})
export class ProductosDetailComponent implements OnInit {

  constructor( private service: ProductosService , private fb: FormBuilder, private location: Location) { }
  
  fileToUpload: File;
  archivoNombre = "Nada Seleccionado";
  ngOnInit() {
    this.createForm();
  }
  
  
  private subirImagen(imagen) {}

  private createForm() {

    

  }

  handleFileInput(file: File) {
    console.log("Archivo: ");
    console.log(file);
    this.fileToUpload = file;
    this.archivoNombre = this.fileToUpload.name;
  }

  back() {
    this.location.back();
  }
  
  /**
   * Enviar al servidor
   */
  sentToServer() {
      console.log("Enviando al servidor");
      this.service.postFile(this.fileToUpload).subscribe(resp => {
        console.log(resp);
      },error =>{
        console.log("Error: ");
        console.log(error);
      });
  }
}
