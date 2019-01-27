import {Component, OnInit, Input, Output} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';

import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';
import {ProductosService} from '../servicios/productos.service';

@Component({
    selector: 'app-add-compras',
    templateUrl: './add-compras.component.html',
    styleUrls: ['./compras.component.css'],
    providers: [ProductosService]
})
export class AddComprasComponent implements OnInit {

    formCompra: FormGroup;
    formDetalles: FormGroup;
    compra: Compra;


    compraDetalle: CompraDetalle;
    ivas = [0,5,10];
    private compraDetalles: CompraDetalle[];
    private compraDetalles$: ReplaySubject<CompraDetalle[]> = new ReplaySubject(1);
    productos: Observable<Producto[]>;

    constructor(private servicio: ProductosService, private fb: FormBuilder) {}
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
        this.formDetalles.get('porcenGan').valueChanges.subscribe(data => {

            const precioCompra: number = this.formDetalles.get('precioCompra').value
            if (precioCompra != null) {
                var precioVenta: number = precioCompra * (1 + data / 100.0);
                this.formDetalles.get('precioVenta').setValue(precioVenta, {emitEvent: false});
            }

        });
        this.formDetalles.get('precioVenta').valueChanges.subscribe(data => {
            
            const precioCompra: number = this.formDetalles.get('precioCompra').value
            if (precioCompra != null) {
                var porcenGan: number = (data - precioCompra) * 100 / precioCompra;
                this.formDetalles.get('porcenGan').setValue(porcenGan, {emitEvent: false})
            }


        });
        this.formDetalles.get('precioCompra').valueChanges.subscribe(data => {
            
            const porcenGan: number = this.formDetalles.get('porcenGan').value
            if (porcenGan != null) {
                var precioVenta: number = data * (1 + porcenGan / 100.0);
                this.formDetalles.get('precioVenta').setValue(precioVenta, {emitEvent: false})
            }

        });
        this.formDetalles.valueChanges.subscribe(data => {

            this.compraDetalle = this.formDetalles.value;
            this.calcularTotal(this.compraDetalle);
        });


    }

    getCompras(): void {
        this.servicio.getAll().subscribe(data => {



            //        this.dataSource.connect()
            //this.dataSource.paginator = this.paginator;
            //this.dataSource.sort = this.sort;
        });
    }

    private createForm() {
        this.formCompra = this.fb.group({
            id: [this.compra.id],
            proveedor: [this.compra.proveedor, Validators.required],
            fechaCompra: [this.compra.fechaCompra]
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
    guardar() {
        console.log(this.formCompra.value)
        //      Emitir un e        vento
        //      this.change.emit(this.compra)
        this.compra = this.formCompra.value;
        this.compra.compraDetalles = this.compraDetalles;
        this.servicio.save(this.compra).subscribe(data => {
            console.log(data)
        });

        //limpiar texto
    }

    addDetalle() {

        var p = this.formDetalles.get('producto').value


        if (p == null || p.nombre === undefined) {
            
        }
        else {

            var cd = new CompraDetalle();

            cd = this.formDetalles.value;

            cd.nombre = cd.producto.nombre
            cd.codigo = cd.producto.codigo

            this.calcularTotal(cd)
            
            this.compraDetalles.push(cd);
            this.compra.totalExcentas += cd.excentas;
            this.compra.totalIva5 += cd.iva5;
            this.compra.totalIva10 += cd.iva10;
            this.compra.totalGeneral = this.compra.totalExcentas +
                this.compra.totalIva5 + this.compra.totalIva10;            
            this.compraDetalles$.next(this.compraDetalles);
            this.formDetalles.reset();
        }
    }

    getCompraDetalles(): Observable<CompraDetalle[]> {

        return this.compraDetalles$.asObservable();
    }

    displayFn(producto: Producto) {
        return producto ? producto.codigo + ', ' + producto.nombre : '';
    }

    private calcularTotal(cd: CompraDetalle): CompraDetalle {
        switch (cd.iva) {
            case 0: {
                cd.excentas= cd.cantidad * cd.precioCompra ;
                cd.iva5= 0;
                cd.iva10= 0;
                break;
            }
            case 5: {
                cd.excentas= 0;
                cd.iva5= cd.cantidad * cd.precioCompra * cd.iva / 100;
                cd.iva10= 0;
                break;
            }
            case 10: {
                cd.excentas= 0;
                cd.iva5= 0;
                cd.iva10= cd.cantidad * cd.precioCompra * cd.iva / 100;
                break;
            }
        }
        return cd;
    }
}
