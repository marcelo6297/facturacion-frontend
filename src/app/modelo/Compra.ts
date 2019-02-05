/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Producto} from './Producto';

export interface Impositivo {
    totalExcentas: number;    
    totalIva5: number ;    
    totalIva10: number ; 
    totalGeneral: number ;
}

export class Compra implements Impositivo{
    id: number;
    proveedor: string;
    fechaCompra: string;
    totalExcentas: number = 0.0;    
    totalIva5: number = 0.0;    
    totalIva10: number = 0.0; 
    totalGeneral: number = 0.0;
    compraDetalles: CompraDetalle[];
}

export class CompraDetalle {
    id: number;
    compra: Compra;
    producto: Producto;
    codigo: string;
    nombre: string;
    descripcion: string;
    precioCompra: number;
    porcenGan: number;
    precioVenta: number;
    cantidad: number;
    porcenIva: number;
    montoIva:number;
    subTotal:number
}


