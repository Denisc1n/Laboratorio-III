"use strict";
var filtro = "sinfiltro";
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
    $('#btn-limpiar').click(limpiarAlmacenamiento);
    $('#btnAplicar').click(filtrarPor);
    $('#btn-promedio').click(calcularPromedio);
    $('#checkboxes').on('click', "input[type=checkbox]", mostrarOcultarColumna);
    mostrarVehiculos();
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
    var modelo = String($('#txtModelo').val());
    var marca = String($('#txtMarca').val());
    var precio = Number($('#numPrecio').val());
    var tipo = $('input[name=vtype]:checked').val();
    if (tipo === "auto") {
        var nuevoAuto = void 0;
        var detalle = String($('input[name=car]:checked').val() === "true" ? "Coupe" : "Sedan");
        nuevoAuto = new Classes.Auto(id, marca, modelo, precio, detalle);
        var entidades = leerLocalStorage();
        entidades.push(nuevoAuto.toJson());
        guardarEnLocalStorage(entidades);
        mostrarVehiculos();
    }
    else {
        var detalle = $('input[name=car]:checked').val() === "true" ? "4x4" : "4x2";
        var nuevaCamioneta = new Classes.Camioneta(id, marca, modelo, precio, detalle);
        var entidades = leerLocalStorage();
        entidades.push(nuevaCamioneta.toJson());
        guardarEnLocalStorage(entidades);
        mostrarVehiculos();
    }
    $(".modal").modal("hide");
}
function calcularID() {
    var entidades = leerLocalStorage();
    var id = entidades.reduce(function (maxId, item) {
        var vehiculo = JSON.parse(item);
        if (maxId < vehiculo.id) {
            maxId = vehiculo.id;
        }
        return maxId;
    }, 0);
    $('#numId').val(id + 1);
}
function mostrarVehiculos() {
    var tBody = $('#tBody');
    tBody.html('').find("tr:gt(0)").remove();
    var objetos = leerLocalStorage();
    objetos.forEach(function (element) {
        var vehiculo = JSON.parse(element);
        if (vehiculo.cuatroXcuatro != null) {
            tBody.append("<tr>\n                    <td>" + vehiculo.id + "</td>\n                    <td class=\"marca\">" + vehiculo.marca + "</td>\n                    <td class=\"modelo\">" + vehiculo.modelo + "</td>\n                    <td class=\"precio\">" + vehiculo.precio + "</td>\n                    <td class=\"caracteristica\">" + vehiculo.cuatroXcuatro + "</td> \n                    <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n                </tr>'); \n                ");
        }
        else {
            tBody.append("<tr>\n                    <td>" + vehiculo.id + "</td>\n                    <td class=\"marca\">" + vehiculo.marca + "</td>\n                    <td class=\"modelo\">" + vehiculo.modelo + "</td>\n                    <td class=\"precio\">" + vehiculo.precio + "</td>\n                    <td class=\"caracteristica\">" + vehiculo.cantidadPuertas + "</td> \n                    <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n                </tr>'); \n                ");
        }
    });
}
function eliminar(i) {
    var entidades = leerLocalStorage();
    entidades.splice(i, 1);
    guardarEnLocalStorage(entidades);
    mostrarVehiculos();
}
function limpiarAlmacenamiento() {
    //localStorage.clear();
    console.log("Limpie el Storage");
}
function filtrarPor() {
    var seleccion = $('#filtrarPor').val();
    var listafiltrada;
    if (seleccion === "auto") {
        var entidades = leerLocalStorage();
        listafiltrada = entidades.filter(function (entidad) {
            var jsonentidad = JSON.parse(entidad);
            console.log(jsonentidad.cantidadPuertas);
            if (jsonentidad.cantidadPuertas != undefined)
                return jsonentidad;
        });
        filtro = "auto";
    }
    else if (seleccion === "camioneta") {
        var entidades = leerLocalStorage();
        listafiltrada = entidades.filter(function (entidad) {
            var jsonentidad = JSON.parse(entidad);
            if (jsonentidad.cuatroXcuatro != undefined)
                return jsonentidad;
        });
        filtro = "camioneta";
    }
    else {
        filtro = "sinfiltro";
        listafiltrada = leerLocalStorage();
    }
    mostrarListaFiltrada(listafiltrada);
}
function mostrarListaFiltrada(lista) {
    var tBody = $('#tBody');
    tBody.html('').find("tr:gt(0)").remove();
    var objetos = lista;
    objetos.forEach(function (element) {
        var vehiculo = JSON.parse(element);
        if (vehiculo.cuatroXcuatro != null) {
            tBody.append("<tr>\n                    <td>" + vehiculo.id + "</td>\n                    <td>" + vehiculo.marca + "</td>\n                    <td>" + vehiculo.modelo + "</td>\n                    <td>" + vehiculo.precio + "</td>\n                    <td>" + vehiculo.cuatroXcuatro + "</td> \n                    <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n                </tr>'); \n                ");
        }
        else {
            tBody.append("<tr>\n                    <td>" + vehiculo.id + "</td>\n                    <td>" + vehiculo.marca + "</td>\n                    <td>" + vehiculo.modelo + "</td>\n                    <td>" + vehiculo.precio + "</td>\n                    <td>" + vehiculo.cantidadPuertas + "</td> \n                    <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n                </tr>'); \n                ");
        }
    });
    $(".modal").modal("hide");
}
function calcularPromedio() {
    var suma = 0;
    var contador = 0;
    $("#myTable").find('> tbody > tr').each(function () {
        suma += parseInt($(this).find('td').eq(3).html());
        contador++;
    });
    var resultado = suma / contador;
    $("#idProm").val(resultado);
}
function mostrarOcultarColumna() {
    $("input:checkbox:not(:checked)").each(function () {
        var column = "table ." + $(this).attr("name");
        $(column).hide();
    });
    $("input:checkbox").click(function () {
        var column = "table ." + $(this).attr("name");
        $(column).toggle();
    });
}
