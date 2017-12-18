import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ClientesService} from './../servicios/clientes.service';
import { Tipo, Cliente } from './../modelo/cliente';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.css'],
  providers: [ClientesService]
  
})
export class ClienteDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private location: Location , private service: ClientesService, private fb: FormBuilder) {}
    
  tipos: string[];
  @Input() cliente: Cliente;
  showError: boolean;
  error: any;
  tipo: Tipo ;
  formCliente: FormGroup;
  ngOnInit() {
      this.getTipos();
      if (this.cliente != null) {
          
        }
        else {

            this.cliente = new Cliente();
        }
      this.createForm();
      
  }

  
  getTipos() {
      this.service.getAllTipos().subscribe(res => this.tipos = res);
  }
  
  back() {
      this.location.back();
  }

  private createForm() {
      this.formCliente = this.fb.group({
          id: [this.cliente.id],
          nombre: [this.cliente.nombre, Validators.required],
          apellido: [this.cliente.apellido],
          ruc: [this.cliente.ruc, Validators.required],
          activo: [this.cliente.activo],
          direccion: this.fb.group ({
              direccion1: '',
              direccion2: '',
          }),
          fechaNacimiento: [this.cliente.createdOn],
          telefono: [''],
          tipo: this.cliente.tipo
      });
  }

  saveOrUpdate() {
    //   this.cliente.tipo = this.tipo;

      this.service.saveOrUpdate(this.formCliente.value).subscribe(res => {
          console.log(res);
          this.showError = false;
          this.formCliente.reset();
          this.tipo = new Tipo();
      }, err => {
          this.showError = true;
          this.error = err.error.message;
          console.log(err);
      });
  }

}
