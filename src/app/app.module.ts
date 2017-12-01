import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, 
  MatCheckboxModule,
  MatTableModule,
  MatSidenav,
  MatSidenavModule,
  MatSidenavContent} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
  
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
