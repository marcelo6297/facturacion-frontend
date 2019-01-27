
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSnackBar, MatDialog ,MatTableDataSource, MatCheckboxChange,MatPaginator, MatSort } from '@angular/material';

import { ProductosService } from './../servicios/productos.service';
import { Producto } from '../modelo/Producto';
import { BorrarDialog } from '../dialog/borrar.dialog'
import {ProductoNewDialog} from '../dialog/producto-new.dialog'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService]
})
export class ProductosComponent implements OnInit {

  dataSource: MatTableDataSource<Producto> ;
  displayedColumns = ['id', 'codigo','nombre', 'descripcion', 'precio', 'iva','stockInicial','totalIngreso','totalSalida','totalStock', 'acciones'];
  ids: number[] = [];
  borrarDisabled = true;
  
  message = "No se puede eliminar Productos que tienen Registros asociados en compras o ventas"
  showMessage = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private snackBar: MatSnackBar ,private servicios: ProductosService , public dialog: MatDialog) { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.buildMaterialTable();
    this.cargarTabla();
  }

  /**
   * Retorna la lista de productos desde el servidor
   */
  cargarTabla() {
    return this.servicios.getAll().subscribe(data => {
        this.dataSource.data = data;
          
    });
  }
  
  //Agregado el 2019-01-24
   aBorrar(evt: MatCheckboxChange, id) {
    
    if (evt.checked) {
      this.ids.push(id);
    }
    else {
       // Item to remove
      this.ids = this.ids.filter(obj => obj !== id);
    }
    
      this.borrarDisabled = !(this.ids.length > 0) ;
    
    
  }
  
   borrar() {
       const dialogRef = this.dialog.open(BorrarDialog);
       dialogRef.afterClosed().subscribe(result => {
           console.log(`Dialog result: ${result}`);
           if (result) {
               this.servicios.delete(this.ids).subscribe(res => {
                   this.dataSource.data = res;
                   this.ids = [];
                   this.borrarDisabled = true;
               },
                   error => {
                       this.showSnack(this.message + error.message);

                   });
           }

       });
 }
  
  private buildMaterialTable() {
      this.dataSource = new MatTableDataSource<Producto>();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  
  showSnack(message:any){
        this.snackBar.open(message,"OK" ,{duration: 3000})
    }
    
  nuevo() {
      const dialogRef = this.dialog.open(ProductoNewDialog, {width: 600});
      dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
      }, error => {
          console.log(`Dialog result: ${error}`);
      })
  }  
}
