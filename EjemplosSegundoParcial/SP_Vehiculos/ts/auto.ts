namespace Vehiculos{
    export class Auto extends Vehiculo{
        public cantidadPuertas:number;
        
        constructor(id:number, marca:string, modelo:string, precio:number, puertas:number){
            super(id, marca, modelo, precio);
            this.cantidadPuertas = puertas;
        }

        toJson():string{
            return JSON.stringify(this);
        }
    }
}