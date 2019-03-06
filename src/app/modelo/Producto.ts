/**
 * Clase que representa un producto de la base de datos
 */

 export class Producto {
    id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    notas:string;
    url: string;
    activo:boolean;
    //precios
    precioCompra: number;
    porcenGan: number;
    precioVenta: number;
    porcenIva: number;
    porcenDesc: number=0;
    //Stock
    stockInicial:number   = 0.0;
    stockMinimo :number   = 0.0;
    stockPreOrden:number  = 0.0;
    //calculados
    totalIngreso:number   = 0.0;
    totalSalida:number    = 0.0;
    totalStock:number     = 0.0;

 }