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
    totalCompra: number = 0.0;
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
    subTotalIva: number;
    subTotal: number;
}
