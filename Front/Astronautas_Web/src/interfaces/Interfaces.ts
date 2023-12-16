export interface Astronauta {
    id: number;
    fotos: string;
    nombre: string;
    nacionalidad: string;
    activo: number;
    descripcion: string;
    fechaNacimiento: string;
    edad: number;
  
    RedesSociales: RedSocial;
    Misiones: Mision;
  }

  
 export interface Mision {
    nombreMision: string;
    fechaMision: string;
    descripcionMision: string;
    resultadosMision: string;
  }
  

 export interface RedSocial {
    tipo: string;
    enlace: string;
  }