import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatToolbarModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatSortModule,
  MatSnackBarModule,
  MatDialogModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import {ClienteComponent, ClienteFormDialog, ClienteForm } from './cliente/cliente.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosNewComponent } from './productos/productosNew.component';
import {ProductoNewDialog} from './dialog/producto-new.dialog';
import { BorrarDialog } from './dialog/borrar.dialog';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ComprasComponent } from './compras/compras.component';
import { AddComprasComponent } from './compras/add-compras.component';
import { CompraDetallesComponent } from './compra-detalles/compra-detalles.component';



@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteDetailComponent,
    ProductosComponent,
    ProductosNewComponent,
    FacturacionComponent,
    ProductosDetailComponent,
    UploadsComponent,
    ComprasComponent,
    AddComprasComponent,
    CompraDetallesComponent,
    BorrarDialog,
    ProductoNewDialog,
    ClienteFormDialog, 
    ClienteForm
  ],
  entryComponents: [BorrarDialog, ProductoNewDialog, ClienteFormDialog],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //    Material
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
      MatDialogModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
