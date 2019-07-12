namespace Vehiculos{
    export class Camioneta extends Vehiculo{
        public cuatroXcuatro:boolean;
        
        constructor(id:number, marca:string, modelo:string, precio:number, cuatro:boolean){
            super(id, marca, modelo, precio);
            this.cuatroXcuatro = cuatro;
        }

        toJson():string{
            return JSON.stringify(this);
        }
    }
}