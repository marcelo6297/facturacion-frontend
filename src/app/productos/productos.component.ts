
import {Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import {MatSnackBar, MatDialog ,MatTableDataSource, 
MatCheckboxChange,MatPaginator, MatSort } from '@angular/material';
import { Subscription } from 'rxjs/Subscription'
import {merge} from 'rxjs/operators'

import { ProductosService } from './../servicios/productos.service';
import { Producto }         from '../modelo/Producto';
import { BorrarDialog }     from '../dialog/borrar.dialog'
import { ProductosDialog }  from '../dialog/productos.dialog'
import { PageableRequestOptions} from '../helpers/PageableResponse'
import {Globals} from '../globals'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  providers: [ProductosService,Globals]
})
export class ProductosComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Producto> ;
  displayedColumns = ['id', 'codigo','nombre', 'descripcion', 'precioVenta', 'iva','stockInicial','totalIngreso','totalSalida','totalStock', 'estadoStock', 'acciones'];
  ids: number[] = [];
  borrarDisabled = true;
  
  message = "No se puede eliminar Productos que tienen Registros asociados en compras o ventas"
  showMessage = false;
  
  subscripciones: Subscription[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private snackBar: MatSnackBar ,
      private _srvc: ProductosService , 
      public dialog: MatDialog,
      public global: Globals,
  
  ) { }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  ngOnInit() {
    this.buildMaterialTable();
    this._cargarTabla();
    
    this.subscripciones.push(this.sort.sortChange.subscribe(
        this.paginator.firstPage()
    )) ;

    //suscribir a los dos cambios
    let merged$ = this.paginator.page.pipe(merge(this.sort.sortChange))
    this.subscripciones.push(
        merged$.subscribe(ev=>
            this._cargarTabla(this.paginator, this.sort)
        )
    )
  }
  
   ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
  

  /**
   * Retorna la lista de productos desde el servidor
   */
   private _cargarTabla(page?: MatPaginator, sort?: MatSort) {
       let options = PageableRequestOptions(page,sort)
       
      return this._srvc.getAll(options).subscribe(data => {
          this.dataSource.data     = data.content;
          this.paginator.length    = data.totalElements
          this.paginator.pageSize  = data.size;
          this.paginator.pageIndex = data.number
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
               this._srvc.delete(this.ids).subscribe(res => {
                   //falta mejorar para cumplir con el paginado y ordenado
                   this.dataSource.data = res;
                   this.ids = [];
                   this.borrarDisabled = true;
               },
                   error => {
                       this.showSnack(this.message + error.message);
                       //Que hacer marcar todos los tildados o no

                   });
           }

       });
 }
  
  private buildMaterialTable() {
      this.dataSource = new MatTableDataSource<Producto>();
      
  }
  
  showSnack(message:any){
        this.snackBar.open(message,"OK" ,{duration: 3000})
    }
    
  nuevo() {
      let dialogData = {data : {producto: new Producto(), isEditing: false}, width: '60%' }
      this._openDialog(dialogData)
  }
  
  edit(id:number) {
      let producto
      for (let i = 0; i < this.dataSource.data.length ;i++) {
          if (this.dataSource.data[i].id === id) {
              producto = this.dataSource.data[i]
              break;
          }
      }
      let dialogData = {data: {producto: producto, isEditing: true}, width: '60%' }
      this._openDialog(dialogData)
  }  
  
  private _openDialog(dialogData:any){
      let mensajeOK, mensajeNoOK
        if (dialogData.data.isEditing) {
            mensajeOK = this.global.messageSuccess.editar;
            mensajeNoOK = this.global.messageError.editar;
        }
        else {
            mensajeOK = this.global.messageSuccess.guardar;
            mensajeNoOK = this.global.messageError.guardar;
        }
        const dialogRef = this.dialog.open(ProductosDialog, dialogData);
        dialogRef.afterClosed().subscribe(res => {
            if (res) {
                this._srvc.updateStock().subscribe(res => {
                    this._cargarTabla();
                })
            };
            
        }, error => {
            this.showSnack(mensajeNoOK + error.message)
        })
  }
  
  exists(item) {
      return this.ids.indexOf(item) > -1;
  };
}
