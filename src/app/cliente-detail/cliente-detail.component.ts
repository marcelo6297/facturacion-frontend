import { Component, OnInit } from '@angular/core';
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

  constructor(private route: ActivatedRoute, private location: Location , private service: ClientesService) {}
    
  tipos: Tipo[];
  cliente: Cliente;
  tipo: Tipo ;
  ngOnInit() {
      this.getTipos();
      this.cliente = new Cliente();
      
  }
  
  getTipos() {
      this.service.getAllTipos().subscribe(res => this.tipos = res);
  }
  
  back() {
      this.location.back();
  }

  saveOrUpdate() {
      this.cliente.tipo = this.tipo;
      this.service.saveOrUpdate(this.cliente).subscribe(res => {
          console.log(res);
          this.cliente = new Cliente();
          this.tipo = new Tipo();
      });
  }

}
