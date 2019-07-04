 
namespace Classes{
    export abstract class Vehiculo {
        id:Number;
        marca:String;
        modelo:String;
        precio:Number;
        constructor(id:Number,marca:String,modelo:String,precio:Number) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
    }

    export class Camioneta extends Vehiculo {
        cuatroXcuatro:Boolean;
        constructor(id:Number,marca:String,modelo:String,precio:Number,cuatroXcuatro:Boolean) {
            super(id,marca,modelo,precio);
            this.cuatroXcuatro = cuatroXcuatro;
        }
        toJson():string{
            return JSON.stringify(this);
        }
    }

    export class Auto extends Vehiculo{
        cantidadPuertas:Number;
        constructor(id:Number,marca:String,modelo:String,precio:Number,cantidadPuertas:Number) {
            super(id,marca,modelo,precio);
            this.cantidadPuertas = cantidadPuertas;
        }

        toJson():string{
            return JSON.stringify(this);
        }
    }
}
