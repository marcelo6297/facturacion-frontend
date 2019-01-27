/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {Producto} from './Producto';

export class Compra {
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
    iva: number;
    cantidad: number;
    excentas: number;
    iva5: number;
    iva10: number;
    
}
