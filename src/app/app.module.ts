import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule
  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
  
import { AppComponent } from './app.component';
import { ClienteComponent } from './cliente/cliente.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
//    Material
    MatToolbarModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
