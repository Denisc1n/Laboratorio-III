 
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
}
