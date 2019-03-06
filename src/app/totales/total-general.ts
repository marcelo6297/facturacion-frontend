import { Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {Compra, Impositivo } from '../modelo/Compra';

@Component({
    selector: 'total-general',
    templateUrl: './total-general.html'
})

export class TotalGeneral implements OnInit{
    
    @Input() impositivo$: Observable<Impositivo>;
    impositivo: Impositivo;
    iva5 = 0 ;
    iva10= 0 ;
    constructor() {
        this.impositivo = {totalExentas: 0, totalIva5: 0, totalIva10: 0, totalGeneral: 0, totalDesc:0};
    }
    
    ngOnInit(){
        this.impositivo$.subscribe(data => {
            console.log("Impositivo: ")
            console.log(data)
            this.impositivo = data;
            this.iva5 = data.totalIva5 / 21;
            this.iva10 = data.totalIva10 / 11;
        })
    }
}
