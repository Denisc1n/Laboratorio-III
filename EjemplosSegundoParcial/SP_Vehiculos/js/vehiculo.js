"use strict";
var Vehiculos;
(function (Vehiculos) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        Vehiculo.prototype.toJson = function () {
            return JSON.stringify(this);
        };
        return Vehiculo;
    }());
    Vehiculos.Vehiculo = Vehiculo;
})(Vehiculos || (Vehiculos = {}));
