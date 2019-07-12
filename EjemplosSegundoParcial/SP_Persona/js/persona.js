"use strict";
var Personas;
(function (Personas) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        return Persona;
    }());
    Personas.Persona = Persona;
})(Personas || (Personas = {}));
