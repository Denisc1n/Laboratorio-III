"use strict";
var listaDeAnimales = new Array();
listaDeAnimales.push(new animal.Perro("Perricola"));
listaDeAnimales.push(new animal.Gato("Michi"));
$(function () {
    $("elBotonDeListar").click(cargarLista);
});
function cargarLista() {
    var tbodyObject = $("#tableBody");
    console.log(tbodyObject);
    var animalLeido;
    listaDeAnimales.forEach(function (ani) {
        if (ani instanceof animal.Gato) {
            animalLeido = ani;
        }
        else {
            animalLeido = ani;
        }
        var elementoTr = document.createElement('tr');
        tbodyObject.append(elementoTr);
        //elementoTr.appendChild(generateTd();
        //elementoTr.appendChild(generateTd((Gato)ani.especie));
    });
}
function generateTd(data) {
    var elementoTd = document.createElement('td');
    var elementoText = document.createTextNode(data);
    elementoTd.appendChild(elementoText);
    return elementoTd;
}
//# sourceMappingURL=ejercicio.js.map