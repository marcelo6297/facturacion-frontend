import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { ClienteComponent } from './cliente/cliente.component';

const rutas: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'}, 
  {path: 'index', component: ClienteComponent}, 
  {path: 'clientes', component: ClienteComponent} 
];



@NgModule({
  imports: [
    RouterModule.forRoot(rutas)],
    exports: [RouterModule],
})
export class AppRoutingModule {}