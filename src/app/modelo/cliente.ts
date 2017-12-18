
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class Cliente  {
    id: number;
    nombre: string;
    apellido: string;
    ruc: string;
    telefono: string;
    direccion: Direccion;
    tipo: Tipo;
    activo: boolean;
    fechaNacimiento: string;
    createdOn: string;
    constructor(){
        this.tipo = new Tipo();
        this.direccion = new Direccion();
    }
}

export class Tipo {
    id: number;
    nombre: string;
    createdOn: string;
}

export class Direccion {
    direccion1: string; 
    direccion2: string;
}