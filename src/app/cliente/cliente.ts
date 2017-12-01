
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


export class Cliente  {
    id: number;
    nombre: string;
    apellido: string;
    tipo: Tipo;
    activo: boolean;
    createdOn: string;
    constructor(){
        this.tipo = new Tipo();
    }
}

export class Tipo {
    id: number;
    nombre: string;
    createdOn: string;
}
