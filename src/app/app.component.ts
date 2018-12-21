import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Facturacion V0.1';
  showSideNav = false;
  menu: any = [
    { titulo: 'Clientes', ruta: '/clientes' },
    { titulo: 'Nuevo Cliente', ruta: '/clientes/new' },
    { titulo: 'Productos', ruta: '/productos' },
    { titulo: 'Productos', ruta: '/productos/new' },
    { titulo: 'Facturacion', ruta: '/facturacion' },
    { titulo: 'Compras', ruta: '/compras' },
  ];
  toogleSideNav() {
    this.showSideNav = !this.showSideNav;
  }
}
