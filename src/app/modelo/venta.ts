import {Cliente} from './cliente';
import { Impositivo } from './Compra'
import {Producto} from './Producto'



export class VentaDetalle {
    id: number;
    venta: Venta;
    producto: Producto;
    codigo:string;
    nombre:string;
    descripcion:string;
    cantidad:number;
    precio:number;
    porcenDesc:number;
    porcenIva:number;
    montoDesc:number;
    montoIva:number;
    subTotal:number;
}

export interface Venta extends Impositivo{
    id: number;
    condicionVenta: string; //Credito, Contado
    cliente: Cliente;
    vendedor: string;
    tipoDocumento: string; //Factura, Presupuesto, Recibo, Remision
    numeroDocumento: string;
    fechaVenta: string;
    creadoEl: string;
    actualizadoEl: string;
    ventaDetalles: VentaDetalle[]
}