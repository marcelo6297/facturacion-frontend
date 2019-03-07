import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';


import {Venta} from '../modelo/venta';
import {VentasService} from '../servicios/ventas.service';
import {ClientesService} from '../servicios/clientes.service';
import {Globals} from './../globals'

@Component({
    selector: 'app-ventas-list',
    templateUrl: './ventas.list.component.html',
    styleUrls: ['./ventas.component.css'],
    providers: [VentasService, ClientesService, Globals]
})
export class VentasListComponent implements OnInit {
    
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource: MatTableDataSource<Venta>;
    displayedColumns = ['id',
        'condicionVenta',//Credito, Contado
        'cliente',
        'vendedor',
        'tipoDocumento', //Factura, Presupuesto, Recibo, Remision
        'numeroDocumento',
        'totalGeneral',
        'fechaVenta',
        'acciones'];
    ventas: Venta[];
    borrarDisabled = true;
    ids: number[] = [];

    constructor(private service: VentasService) {}
    ngOnInit() {
        this.dataSource = new MatTableDataSource<Venta>();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.getVentas();
    }

    getVentas(): void {
        this.service.getAll().subscribe(data => {
            this.dataSource.data = data;
        });
    }

}