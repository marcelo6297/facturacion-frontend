import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ProductosComponent } from './productos/productos.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';

const rutas: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: ClienteComponent},
  {path: 'clientes', component: ClienteComponent, pathMatch: 'full'},
  {path: 'clientes/:id/edit', component: ClienteDetailComponent},
  {path: 'clientes/new', component: ClienteDetailComponent, pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent, pathMatch: 'full'},
  {path: 'productos/new', component: ProductosComponent, pathMatch: 'full'},
  {path: 'productos/varios', component: ProductosDetailComponent, pathMatch: 'full'},
  {path: 'facturacion', component: FacturacionComponent, pathMatch: 'full'},
];



@NgModule({
  imports: [
    RouterModule.forRoot(rutas)],
    exports: [RouterModule],
})
export class AppRoutingModule {}