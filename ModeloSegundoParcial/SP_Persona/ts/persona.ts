namespace Personas{
    export class Persona{
        private nombre:string;
        private apellido:string;
        private edad:number;
    
        constructor(nombre:string, apellido:string, edad:number){
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
    }
}