"use strict";
//GUARDAR EN LOCAL STORAGE
var guardarEnLocalStorage = function (entidades) {
    localStorage.setItem('entidades', JSON.stringify(entidades));
};
//LEER LOCAL STORAGE
function leerLocalStorage() {
    var entidades;
    if (localStorage.getItem('entidades') != null) {
        entidades = JSON.parse(localStorage.getItem('entidades'));
    }
    else {
        entidades = [];
    }
    return entidades;
}
$(function () {
    $('input[name=vtype]').change(mostrarCaracteristica);
    $('#btn-agregar').click(calcularID);
    $('#btnGuardar').click(guardarVehiculo);
});
function mostrarCaracteristica() {
    if ($('input[name=vtype]:checked').val() === "auto") {
        $('#hiddenChar input[name=car]').remove();
        $('#hiddenChar label').remove();
        $('#hiddenChar').append("<input type='radio' name='car' value='true'/><label>Coupe</label> <input type='radio' name='car'value='false' checked/><label>Sedan</label>");
        $('#hiddenChar').attr('hidden', false);
    }
    if ($('input[name=vtype]:checked').val() === "camioneta") {
        $('#hiddenChar input[name=car]').remove();
        $('#hiddenChar label').remove();
        $('#hiddenChar').append("<input type='radio' name='car' value='true'/><label>4x4</label> <input type='radio' name='car'value='false' checked/><label>4x2</label>");
        $('#hiddenChar').attr('hidden', false);
    }
}
function guardarVehiculo() {
    var id = Number($('#numId').val());
    console.log($('numId').val());
    var modelo = String($('#inputModelo').val());
    var marca = String($('#inputMarca').val());
    var precio = Number($('#inputPrecio').val());
    var tipo = $('input[name=vtype]:checked').val();
    if (tipo === "auto") {
        var nuevoAuto = void 0;
        var detalle = Number($('input[name=car]:checked').val() === "true" ? 3 : 5);
        nuevoAuto = new Classes.Auto(id, marca, modelo, precio, detalle);
        console.log(nuevoAuto);
    }
    else {
        var detalle = Boolean($('input[name=car]:checked').val() === "true" ? true : false);
        var nuevaCamioneta = new Classes.Camioneta(id, marca, modelo, precio, detalle);
    }
}
function calcularID() {
    var entidades = leerLocalStorage();
    var id = entidades.reduce(function (id, entidad) {
        if (entidad.id > id)
            return id = entidad.id;
    }, 0);
    $('#numId').val(id + 1);
}
function filtrar() {
    console.log('Filtrar');
}
