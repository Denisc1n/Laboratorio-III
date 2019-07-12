namespace Personas{
    export class Empleado extends Persona{
        private horario:string;
        private legajo:number;
        
        constructor(nombre:string, apellido:string, edad:number, horario:string, legajo:number){
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;   
        }

        toJson():string{
            return JSON.stringify(this);
        }

        get Legajo(){
            return this.legajo;
        }
    }
}