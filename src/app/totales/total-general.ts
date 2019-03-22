import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

import { Impositivo } from '../modelo/Compra';

@Component({
    selector: 'total-general',
    templateUrl: './total-general.html'
})

export class TotalGeneral implements OnInit, OnDestroy{
    
    @Input() impositivo$: Observable<Impositivo>;
    impositivo: Impositivo;
    iva5 = 0 ;
    iva10= 0 ;
    subscripciones: Subscription[]=[];
    
    constructor() {
        this.impositivo = {totalExentas: 0, totalIva5: 0, totalIva10: 0, totalGeneral: 0, totalDesc:0};
    }
    
    ngOnInit(){
        this.subscripciones.push(
            this.impositivo$.subscribe(data => {
                console.log("Impositivo: ")
                console.log(data)
                this.impositivo = data;
                this.iva5 = data.totalIva5 / 21;
                this.iva10 = data.totalIva10 / 11;
            })
        )
    }
    
    ngOnDestroy(): void {
        this.subscripciones.forEach(i => {i.unsubscribe()})
    }
}
