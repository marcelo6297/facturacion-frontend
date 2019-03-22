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
  MatDialogModule,
  MatGridListModule,
  MatRadioModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import {ClienteComponent, ClienteFormDialog, ClienteForm } from './cliente/cliente.component';
import { AppRoutingModule } from './app-routing.module';
import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ProductosComponent } from './productos/productos.component';

import { ProductosDialog} from './dialog/productos.dialog';
import { BorrarDialog } from './dialog/borrar.dialog';

import { ProductosDetailComponent } from './productos-detail/productos-detail.component';
import { UploadsComponent } from './uploads/uploads.component';
import { ComprasComponent } from './compras/compras.component';
import { AddComprasComponent } from './compras/add-compras.component';
import { CompraDetallesComponent } from './compra-detalles/compra-detalles.component';
import { ComprasService } from './servicios/compras.service'
import { ProductosService } from './servicios/productos.service'
import { TotalGeneral } from './totales/total-general';
import { VentasComponent } from './ventas/ventas.component'
import { VentasListComponent } from './ventas/ventas.list.component'

import { VentasForm } from './forms/ventas.form'
import { ProductosForm } from './forms/productos.form'
import { DetalleVentaForm } from './forms/detalle-venta.form'
import { TablaVentaDetalles } from './ventas/tabla-venta-detalles'




@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ClienteDetailComponent,
    ProductosComponent,
    
    ProductosDetailComponent,
    UploadsComponent,
    ComprasComponent,
    AddComprasComponent,
    CompraDetallesComponent,
    BorrarDialog,
    ProductosDialog,
    ClienteFormDialog, 
    ClienteForm,
    TotalGeneral,
    VentasComponent,
    VentasListComponent,
    VentasForm,
    ProductosForm,
    DetalleVentaForm,
    TablaVentaDetalles
    
  ],
  entryComponents: [BorrarDialog, ProductosDialog, ClienteFormDialog],
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
    FlexLayoutModule,
    MatGridListModule,
      MatRadioModule
  ],
  providers: [ComprasService,ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
