import {Component, OnInit, ViewChild} from '@angular/core';
import {
    MatTableDataSource,
    MatCheckboxChange,
    MatSort,
    MatPaginator,
    MatSnackBar,
    MatDialog
} from '@angular/material';
import { Observable } from 'rxjs/Observable';

import {Venta} from '../modelo/venta';
import {VentasService} from '../servicios/ventas.service';
import {ClientesService} from '../servicios/clientes.service';
import {BorrarDialog} from '../dialog/borrar.dialog';
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
        'estado',  //Pendiente, Pagado, Anulado
        'tipoDocumento', //Factura, Presupuesto, Recibo, Remision
        'numeroDocumento',
        'totalGeneral',
        'fechaVenta',
        'acciones'];
    ventas: Venta[];
    anularDisabled = true;
    ids: number[] = [];

    constructor(
        private service: VentasService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private global: Globals

    ) {}
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

    aAnular(evt: MatCheckboxChange, id) {

        if (evt.checked) {
            this.ids.push(id);
        }
        else {
            // Item to remove
            this.ids = this.ids.filter(obj => obj !== id);
        }

        this.anularDisabled = !(this.ids.length > 0);


    }

    private _showSnack(message: string) {
        this.snackBar.open(message, "", {duration: this.global.duration.long})
    }
    
    private _dialogAnular(message: string): Observable<any>{
        const dialogRef = this.dialog.open(BorrarDialog, {data: message});
        return dialogRef.afterClosed();
    }
    
    anular() {
        this._dialogAnular("En realidad desea anular estos Items?").subscribe(
            succ => {
                if (succ) {
                    this.service.anular(this.ids).subscribe(data => {
                        this.ids = [];
                        this.anularDisabled = true
                        this.getVentas()
                    });
                }
                else {
                    console.log('NO envar al server')
                    
                }
            }
        )
        
    }

}