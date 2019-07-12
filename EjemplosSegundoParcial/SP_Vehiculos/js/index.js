"use strict";
//ARRAY DE ENTIDADES
var entidades = (localStorage.getItem('entidades') != null) ? JSON.parse(localStorage.getItem('entidades')) : [];
var vehiculo = $('#select-vehiculo').val(), filtrarPor = $('#selector-filtro').val();
//GUARDAR EN LOCAL STORAGE
var guardarEnLocalStorage = function () {
    localStorage.setItem('entidades', JSON.stringify(entidades));
};
//LEER LOCAL STORAGE
function leerLocalStorage() {
    var objetos = [];
    entidades.forEach(function (element) {
        objetos.push(JSON.parse(element));
    });
    return objetos;
}
$(function () {
    $('#btn-limpiarLocal').click(limpiarLocalStorage);
    $('#btn-agregar').click(agregar);
    $('#btn-modificar').click(modificar);
    $('#btn-cancelar').click(cancelar);
    $('#btn-filtrar').click(filtrar);
    $('#select-vehiculo').change(function () {
        vehiculo = String($(this).val());
        console.log(vehiculo);
    });
    $('#selector-filtro').change(function () {
        filtrarPor = String($(this).val());
        console.log(filtrarPor);
    });
    $('#btn-calcularPromedio').click(calcularPromedio);
    $('.togglecol').on('change', function (e) {
        // get the target for this checkbox and toggle it
        var tableColumn = $(e.currentTarget).data('target');
        $('.' + tableColumn).toggle();
    });
    mostrarEmpleados();
});
function agregar() {
    var id = generarId(), marca = $('#input-marca'), modelo = $('#input-modelo'), precio = $('#input-precio');
    var nuevoVehiculo = vehiculo === 'Auto' ? new Vehiculos.Auto(id, String(marca.val()), String(modelo.val()), Number(precio.val()), 4) :
        new Vehiculos.Camioneta(id, String(marca.val()), String(modelo.val()), Number(precio.val()), true);
    entidades.push(nuevoVehiculo.toJson());
    guardarEnLocalStorage();
    mostrarEmpleados();
}
function modificar() {
    console.log('Modificar');
}
function eliminar(i, e) {
    entidades.splice(i, 1);
    guardarEnLocalStorage();
    mostrarEmpleados();
}
function cancelar() {
    console.log(generarId());
}
function generarId() {
    var objetos = leerLocalStorage(), id = objetos.reduce(function (maxId, item) {
        if (maxId < item.id) {
            maxId = item.id;
        }
        return maxId;
    }, 1);
    return id + 1;
}
function mostrarEmpleados(e) {
    !!e && e.preventDefault();
    var tBody = $('#tBody');
    tBody.html('');
    entidades.forEach(function (element) {
        var vehiculo = JSON.parse(element);
        tBody.append("<tr>\n                <td class=\"column1\">" + vehiculo.id + "</td>\n                <td class=\"column2\">" + vehiculo.marca + "</td>\n                <td class=\"column3\">" + vehiculo.modelo + "</td>\n                <td class=\"column4\">" + vehiculo.precio + "</td>\n                <td class=\"column5\">\n                    <input type=\"button\" onClick=\"eliminar(" + entidades.indexOf(element) + ")\" value=\"Eliminar\" class=\"btn btn-danger\">\n                </td>\n            </tr>");
    });
}
function limpiarLocalStorage() {
    // localStorage.clear();
    console.log('Limpio local storage');
}
function calcularPromedio() {
    var objetos = leerLocalStorage(), valor = objetos.reduce(function (sumador, item) {
        return sumador + item.precio;
    }, 0) / objetos.length;
    console.log("El promedio es: " + valor);
    $('#span-promedio').html(valor.toFixed(2));
}
function filtrar() {
    var objetos = leerLocalStorage(), camionetas = objetos.filter(function (vehiculo) { return vehiculo.cuatroXcuatro; }), autos = objetos.filter(function (vehiculo) { return vehiculo.cantidadPuertas; });
    console.log('camionetas');
    console.log(camionetas);
    console.log('autos');
    console.log(autos);
}
filtrar();
