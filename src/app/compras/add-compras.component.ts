import { Component, OnInit , Input, Output} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';
import {ComprasService} from '../servicios/compras.service';
import {ProductosService} from '../servicios/productos.service';

@Component({
  selector: 'app-add-compras',
  templateUrl: './add-compras.component.html',
  styleUrls: ['./compras.component.css'],
  providers: [ComprasService, ProductosService]
})
export class AddComprasComponent implements OnInit {

  formCompra: FormGroup;
  formDetalles: FormGroup;
  compra: Compra; 
  compraDetalle: CompraDetalle;
  private compraDetalles: CompraDetalle[]; 
  private compraDetalles$: ReplaySubject<CompraDetalle[]> = new ReplaySubject(1); 
  productos: Observable<Producto[]>; 
      
  constructor(private servicio: ProductosService,private service: ComprasService, private fb: FormBuilder) { }
  ngOnInit() {
      this.getCompras();
      this.compra = new Compra();
      this.compraDetalle = new CompraDetalle();
      this.compraDetalles = new Array<CompraDetalle>();
      this.createForm();
//      for (var i=0; i<10; i++){
//          var cd = new CompraDetalle();
//          cd.compra = this.compra;
//          cd.precioVenta = 10;
//          cd.iva = 10;
//          cd.cantidad = 10;
//          cd.nombre = "Test"+i;
//          cd.codigo = "A00"+i;
//          this.compraDetalles.push(cd);
//      }
//      console.log("Ejecutando ngInit");
//      this.compraDetalles$.next(this.compraDetalles);
      this.formDetalles.get('producto').valueChanges.subscribe(data => {
       
        //this.clientes = this.service.search(data).pipe();
           
       this.productos = this.servicio.search(data).pipe();
       
    });
     this.formDetalles.get('porcenGan').valueChanges.subscribe(data=> {
         
         const precioCompra:number = this.formDetalles.get('precioCompra').value
         var precioVenta:number    = precioCompra* (1+ data/100.0);
         this.formDetalles.get('precioVenta').setValue(precioVenta)
         
     });
     this.formDetalles.get('precioVenta').valueChanges.subscribe(data=> {
         
         const precioCompra:number = this.formDetalles.get('precioCompra').value
         var porcenGan: number = (data - precioCompra) * 100 / precioCompra;
         this.formDetalles.get('porcenGan').setValue(porcenGan,{emitEvent: false})
         
     });
      
  }
  
  getCompras(): void {
    this.service.getAll().subscribe(data => {
      
      
     
      //        this.dataSource.connect()
      //this.dataSource.paginator = this.paginator;
      //this.dataSource.sort = this.sort;
    });
  }
  
  private createForm() {
        this.formCompra = this.fb.group({
            id: [this.compra.id],
            proveedor: [this.compra.proveedor, Validators.required],
            fechaCompra:[this.compra.fechaCompra],
            totalCompra: [this.compra.totalCompra, Validators.required],
        });
        this.formDetalles = this.fb.group({
            id: [this.compraDetalle.id],
            compra: [this.compra],
            producto: [this.compraDetalle.producto],
            cantidad: [this.compraDetalle.cantidad],
            precioCompra: [this.compraDetalle.precioCompra],
            porcenGan: [this.compraDetalle.porcenGan],
            precioVenta: [this.compraDetalle.precioVenta],
            iva: [this.compraDetalle.iva],
        })
    }
  agregar () {
      console.log(this.formCompra.value)
//      Emitir un evento
//      this.change.emit(this.compra)
      
      //limpiar texto
  }
  
  addDetalle() {

      var p: Producto = this.formDetalles.get('producto').value


      if (p == undefined) {
          console.log("mostrar error")
      }
      else {

          var cd = new CompraDetalle();

          cd = this.formDetalles.value;

          cd.nombre = cd.producto.nombre
          cd.codigo = cd.producto.codigo

          this.compraDetalles.push(cd);

          this.compraDetalles$.next(this.compraDetalles);
          this.formDetalles.reset();
      }
  }
  
  getCompraDetalles(): Observable<CompraDetalle[]> {
      
      return this.compraDetalles$.asObservable();
  }
  
  displayFn(producto: Producto) {
      console.log("displayFN");
      return producto ? producto.codigo +', '+ producto.nombre : '';
  }
  
  
}
