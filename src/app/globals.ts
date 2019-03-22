import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  

  messageSuccess = {
      guardar: "Guardado Con Exito!!!",
      editar:  "Editado Con Exito!!!",
      elimiar:  "Eliminado/s Con Exito!!!"
  }
  messageError = {
      guardar: "No se pudo guardar, verifique los datos del formulario, \n\
                Información adicional: ",
      editar:  "No se pudo editar, verifique los datos del formulario, \n\
                Información adicional: ",
      elimiar:  "No se pudo eliminar, verifique los datos del formulario, \n\
                Información adicional: ",
  }
  

    duration = {
        short : 700,
        medium : 1500,
        long : 3000,
    }
}
