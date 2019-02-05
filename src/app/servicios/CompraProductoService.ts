import { Injectable } from '@angular/core'; 

import {ComprasService} from './compras.service'
import {ProductosService} from './productos.service'


    

@Injectable()
export class CompraProductoService {
    
    constructor(public compraSrvc: ComprasService, public productoSrvc: ProductosService){}
    
    
}

