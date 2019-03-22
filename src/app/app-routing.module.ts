import { UploadsComponent } from './uploads/uploads.component';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ProductosComponent } from './productos/productos.component';


import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { ComprasComponent } from './compras/compras.component';
import { AddComprasComponent } from './compras/add-compras.component';
import { VentasComponent } from './ventas/ventas.component';
import { VentasListComponent } from './ventas/ventas.list.component';


const rutas: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: ClienteComponent},
  {path: 'clientes', component: ClienteComponent, pathMatch: 'full'},
  {path: 'clientes/:id/edit', component: ClienteDetailComponent},
  {path: 'clientes/new', component: ClienteDetailComponent, pathMatch: 'full'},
  {path: 'clientes/upload', component: UploadsComponent, pathMatch: 'full'},
  {path: 'productos', component: ProductosComponent, pathMatch: 'full'},
//  {path: 'productos/:id/edit', component: ProductosNewComponent, pathMatch: 'full'},
//  {path: 'productos/new', component: ProductosNewComponent, pathMatch: 'full'},
  {path: 'productos/varios', component: ProductosDetailComponent, pathMatch: 'full'},
  {path: 'compras', component: ComprasComponent, pathMatch: 'full'},
  {path: 'compras/new', component: AddComprasComponent, pathMatch: 'full'},
  {path: 'compras/:id/edit', component: AddComprasComponent, pathMatch: 'full'},
  {path: 'ventas', component: VentasListComponent, pathMatch: 'full'},
  {path: 'ventas/new', component: VentasComponent, pathMatch: 'full'},
  {path: 'ventas/:id/edit', component: VentasComponent, pathMatch: 'full'},
//  {path: 'ventas/new', component: AddVentasComponent, pathMatch: 'full'},
];



@NgModule({
  imports: [
    RouterModule.forRoot(rutas)],
    exports: [RouterModule],
})
export class AppRoutingModule {}