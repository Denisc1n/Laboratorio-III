"use strict";
//ARRAY DE ENTIDADES
var entidades = (localStorage.getItem('entidades') != null) ? JSON.parse(localStorage.getItem('entidades')) : [];
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
    $('#btn-modificar').hide();
    $('#btn-agregar').click(agregar);
    $('#btn-modificar').click(modificar);
    $('#btn-eliminar').click(eliminar);
    $('#btn-cancelar').click(cancelar);
    $('#btn-filtrar').click(filtrar);
});
function agregar() {
    console.log('Agregar');
}
function modificar() {
    console.log('Modificar');
}
function eliminar() {
    console.log('Eliminar');
}
function cancelar() {
    console.log('Cancelar');
}
function filtrar() {
    console.log('Filtrar');
}
