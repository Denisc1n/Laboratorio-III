"use strict";
var animal;
(function (animal) {
    var Gato = /** @class */ (function () {
        function Gato(nombre) {
            this.nombreGato = "";
            this.nombreGato = nombre;
        }
        Gato.prototype.hacerRuido = function () {
            return "MIAU.";
        };
        return Gato;
    }());
    animal.Gato = Gato;
})(animal || (animal = {}));
//# sourceMappingURL=gato.js.map