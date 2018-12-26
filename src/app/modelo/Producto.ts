/**
 * Clase que representa un producto de la base de datos
 */

 export class Producto {
    id: number;
    nombre: string;
    codigo: string;
    descripcion: string;
    
    imagen: string;
    precio: number;
    precioCompra: number;
    porcenGan: number;
    precioVenta: number;
    precioLista: number;
    iva: number;
    //Stock
    stockInicial:number   = 0.0;
    stockMinimo :number   = 0.0;
    stockPreOrden:number  = 0.0;
    totalIngreso:number   = 0.0;
    totalSalida:number    = 0.0;
    totalStock:number     = 0.0;
    notas:string;
    activo:boolean;

 }