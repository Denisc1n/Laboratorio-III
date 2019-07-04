namespace Classes{
    export class Auto extends Vehiculo{
        cantidadPuertas:String;
        constructor(id:Number,marca:String,modelo:String,precio:Number,cantidadPuertas:String) {
            super(id,marca,modelo,precio);
            this.cantidadPuertas = cantidadPuertas;
        }

        toJson():string{
            return JSON.stringify(this);
        }
    }
}