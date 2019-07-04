namespace Classes{
    export class Camioneta extends Vehiculo {
        cuatroXcuatro:string;
        constructor(id:Number,marca:String,modelo:String,precio:Number,cuatroXcuatro:string) {
            super(id,marca,modelo,precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }
        toJson():string{
            return JSON.stringify(this);
        }
    }

}
