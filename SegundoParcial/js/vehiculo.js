"use strict";
var Classes;
(function (Classes) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        return Vehiculo;
    }());
    Classes.Vehiculo = Vehiculo;
})(Classes || (Classes = {}));
