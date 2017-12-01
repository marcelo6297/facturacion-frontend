import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';

const rutas: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'}, 
  {path: 'index', component: ClienteComponent}, 
  {path: 'clientes', component: ClienteComponent, pathMatch: 'full'}, 
  {path: 'clientes/new', component: ClienteDetailComponent, pathMatch: 'full'} 
];



@NgModule({
  imports: [
    RouterModule.forRoot(rutas)],
    exports: [RouterModule],
})
export class AppRoutingModule {}