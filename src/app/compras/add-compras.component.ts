import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material'
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {debounceTime} from 'rxjs/operators/debounceTime';

import {Compra, CompraDetalle} from '../modelo/Compra';
import {Producto} from '../modelo/Producto';
import {CompraProductoService} from '../servicios/CompraProductoService';
import {Globals} from './../globals'


@Component({
    selector: 'app-add-compras',
    templateUrl: './add-compras.component.html',
    styleUrls: ['./compras.component.css'],
    providers: [CompraProductoService, Globals]
})
export class AddComprasComponent implements OnInit {

    formCompra: FormGroup;
    formDetalles: FormGroup;
    compra: Compra;
    isEditing: boolean = false;
    
    compraDetalle: CompraDetalle;
    ivas = [0, 5, 10];
    productos: Observable<Producto[]>;
    idProductos:string[]=[];

    private compra$: Subject<Compra>;
    private compraDetalles$: ReplaySubject<CompraDetalle[]>;

    constructor(
        private servicio: CompraProductoService,
        private fb: FormBuilder,
        private location: Location,
        private route: ActivatedRoute,
        private sb: MatSnackBar,
        private global: Globals
    ) {
        this.compra$ = new Subject();
        this.compraDetalles$ = new ReplaySubject(1);
    }
    ngOnInit() {
        console.log("AddComprasComponent: onInit")
        this.compra = new Compra();
        this.compra.compraDetalles = [];
        this.compraDetalle = new CompraDetalle();

        if (this.location.path() != "/compras/new") {
            //esta editando
            const id = +this.route.snapshot.paramMap.get('id');
            this.isEditing = true;
            this.getById(id);

        }

        this.createForm();

    }

    private createForm() {
        
        this.formCompra = this.fb.group({
            id: [this.compra.id],
            proveedor: [this.compra.proveedor, Validators.required],
            fechaCompra: [this.compra.fechaCompra]
        });
        this.formDetalles = this.fb.group({
            id: [this.compraDetalle.id],
            producto: [this.compraDetalle.producto, Validators.required],
            cantidad: [this.compraDetalle.cantidad, Validators.required],
            precioCompra: [this.compraDetalle.precioCompra, Validators.required],
            porcenGan: [this.compraDetalle.porcenGan, Validators.required],
            precioVenta: [this.compraDetalle.precioVenta, Validators.required],
            porcenIva: [this.compraDetalle.porcenIva, Validators.required],
        });
        this.formDetalles.get('producto').valueChanges.pipe(debounceTime(700))
        .subscribe(data => {

            if (data && data.id) {
                this._editarDetalles(data);
            }
            else {
                this.productos = this.servicio
                    .productoSrvc.search(data, this.idProductos).pipe();
            }

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
        
    }
    guardar() {
        const detalles = this.compra.compraDetalles;
        this.compra = this.formCompra.value;
        this.compra.compraDetalles = detalles;
        console.log(this.compra)
        this.servicio.compraSrvc.save(this.compra).subscribe(data => {
            this.sb.open(this.global.successMessage, "", {duration: this.global.duration.medium})
        },
        error => {this.sb.open(this.global.errorMessage+error, "", {duration: this.global.duration.medium})}
        );

        //limpiar texto
    }

    addDetalle() {

        var p = this.formDetalles.get('producto').value


        if (p == null || p.nombre === undefined) {
            this.sb.open(this.global.errorMessage, "", {duration: this.global.duration.long})
        }
        else {

            var cd = new CompraDetalle();

            cd = this.formDetalles.value;

            cd.nombre = cd.producto.nombre
            cd.codigo = cd.producto.codigo
            
            this.formDetalles.reset();

            this._calcularTotal(cd, "addDetalle")
            this._agregarDetalle(cd)
            
        }
    }

    getCompraDetalles(): Observable<CompraDetalle[]> {
        return this.compraDetalles$.asObservable();
    }

    displayFn(producto: Producto) {
        return producto ? producto.codigo + ', ' + producto.nombre : '';
    }

    private _calcularTotal(det: CompraDetalle, llamado?): CompraDetalle {
        console.log("Calcular total: " + llamado)
        det.subTotal = det.cantidad * det.precioCompra;
        det.montoIva = det.subTotal * det.porcenIva / 100;
        return det;
    }

    getById(id: number) {
        this.servicio.compraSrvc.getById(id).subscribe(
            compra => {
                this.compra = compra
                this.compraDetalles$.next(this.compra.compraDetalles);
                this.compra$.next(this.compra);
                this.idProductos = this._getProductoIds()
                this.formCompra.setValue({
                    id: this.compra.id,
                    proveedor: this.compra.proveedor,
                    fechaCompra: new Date(this.compra.fechaCompra)
                })
            }

        );
    }

    getImpositivo$(): Observable<Compra> {
        return this.compra$.asObservable();
    }
    
    borrar(event$) {
       this._removerDetalle(event$);
    }
    
    private _agregarDetalle(cd: CompraDetalle) {
        
        switch (cd.porcenIva) {
            case 0:
                this.compra.totalExentas += cd.subTotal;
                break;
            case 5:
                this.compra.totalIva5 += cd.subTotal + cd.montoIva;
                break;
            case 10:
                this.compra.totalIva10 += cd.subTotal + cd.montoIva;
                break;
        }

        this.compra.totalGeneral = this.compra.totalExentas +
        this.compra.totalIva5 + this.compra.totalIva10;
        this.compra.compraDetalles.push(cd);
        this.idProductos.push(cd.producto.id.toString());
        this.compraDetalles$.next(this.compra.compraDetalles);
        this.compra$.next(this.compra)
    }
    
    private _removerDetalle(cd: CompraDetalle) {
        const detalles = this.compra.compraDetalles;
        
        if (detalles.includes(cd)) {
            detalles.splice(detalles.indexOf(cd), 1)
            this.idProductos.splice(
                this.idProductos.indexOf(cd.producto.id.toString()),1
            );
            this.compra.compraDetalles = detalles;
        }

        switch (cd.porcenIva) {
            case 0:
                this.compra.totalExentas -= cd.subTotal;
                break;
            case 5:
                this.compra.totalIva5 -= cd.subTotal + cd.montoIva;
                break;
            case 10:
                this.compra.totalIva10 -= cd.subTotal + cd.montoIva;
                break;
        }

        this.compra.totalGeneral = this.compra.totalExentas +
        this.compra.totalIva5 + this.compra.totalIva10;
        this.compra$.next(this.compra);
        this.compraDetalles$.next(this.compra.compraDetalles);
    }
    
    back() {
        this.location.back();
    }
    
    edit(cd:CompraDetalle){
        this._removerDetalle(cd);    
        this._editarDetalles(cd)
    }
    
    private _editarDetalles(data) {
        console.log("data: $()" + data);
        const evt = {emitEvent: false}
        if (data.producto) 
            this.formDetalles.get('producto').setValue(data.producto, evt);
        if (data.cantidad)
            this.formDetalles.get('cantidad').setValue(data.cantidad, evt);
        
        this.formDetalles.get('precioCompra').setValue(data.precioCompra, evt);
        this.formDetalles.get('porcenGan').setValue(data.porcenGan, evt)
        this.formDetalles.get('precioVenta').setValue(data.precioVenta, evt);
        this.formDetalles.get('porcenIva').setValue(data.porcenIva, evt);  
    }
    
    private _getProductoIds() {
        var result = [];
        for (var i = 0; i <this.compra.compraDetalles.length ; i++ ) {
            result.push(this.compra.compraDetalles[i].producto.id.toString())
        }
        return result;
    }
}
