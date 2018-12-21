import { Location } from '@angular/common';
import { UploadsService } from '../servicios/uploads.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css'],
  providers: [UploadsService]
})
export class UploadsComponent implements OnInit {

  constructor(private service: UploadsService, private location: Location ) { }


  fileToUpload: File;
  archivoNombre = "Nada Seleccionado";

  ngOnInit() {
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
    this.archivoNombre = this.fileToUpload.name;
  }


  sentToServer() {
      console.log("Enviando al servidor!!!");


      this.service.postClienteFile(this.fileToUpload, "/clientes").subscribe(resp => {
        console.log(resp);
      },error =>{
        console.log("Error: ");
        console.log(error);
      });

  }

}
