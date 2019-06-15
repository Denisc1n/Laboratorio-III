"use strict";
var animal;
(function (animal) {
    var Perro = /** @class */ (function () {
        function Perro(nombre) {
            this.nombrePerro = "";
            this.nombrePerro = nombre;
        }
        Perro.prototype.hacerRuido = function () {
            return "Guau.";
        };
        return Perro;
    }());
    animal.Perro = Perro;
})(animal || (animal = {}));
//# sourceMappingURL=perro.js.map