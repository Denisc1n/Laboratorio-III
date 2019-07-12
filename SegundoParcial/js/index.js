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
    $("#modalAgregar")
        .find("input,textarea,select")
        .val('')
        .end();
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
        tBody.append("<tr>\n                <td>" + vehiculo.id + "</td>\n                <td>" + vehiculo.marca + "</td>\n                <td>" + vehiculo.modelo + "</td>\n                <td>" + vehiculo.precio + "</td>\n                <td>" + (vehiculo.cuatroXcuatro == null ? vehiculo.cantidadPuertas : vehiculo.cuatroXcuatro) + "</td> \n                <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n            </tr>'); \n            ");
        //if( vehiculo.cuatroXcuatro != null )
        //{
        //    tBody.append(
        //        `<tr>
        //            <td>${vehiculo.id}</td>
        //            <td class="marca">${vehiculo.marca}</td>
        //            <td class="modelo">${vehiculo.modelo}</td>
        //            <td class="precio">${vehiculo.precio}</td>
        //            <td class="caracteristica">${vehiculo.cuatroXcuatro}</td> 
        //            <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
        //        </tr>'); 
        //        `
        //    )
        //}
        //else{
        //    tBody.append(
        //        `<tr>
        //            <td>${vehiculo.id}</td>
        //            <td class="marca">${vehiculo.marca}</td>
        //            <td class="modelo">${vehiculo.modelo}</td>
        //            <td class="precio">${vehiculo.precio}</td>
        //            <td class="caracteristica">${vehiculo.cantidadPuertas}</td> 
        //            <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
        //        </tr>'); 
        //        `
        //    )
        //}
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
        tBody.append("<tr>\n                <td>" + vehiculo.id + "</td>\n                <td>" + vehiculo.marca + "</td>\n                <td>" + vehiculo.modelo + "</td>\n                <td>" + vehiculo.precio + "</td>\n                <td>" + (vehiculo.cuatroXcuatro == null ? vehiculo.cantidadPuertas : vehiculo.cuatroXcuatro) + "</td> \n                <td> <a href=\"#\" class=\"btn btn-danger\" onClick=\"eliminar(" + objetos.indexOf(element) + ")\">Eliminar</a></td> \n            </tr>'); \n            ");
        //if( vehiculo.cuatroXcuatro != null )
        //{
        //    tBody.append(
        //        `<tr>
        //            <td>${vehiculo.id}</td>
        //            <td>${vehiculo.marca}</td>
        //            <td>${vehiculo.modelo}</td>
        //            <td>${vehiculo.precio}</td>
        //            <td>${vehiculo.cuatroXcuatro}</td> 
        //            <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
        //        </tr>'); 
        //        `
        //    )
        //}
        //else{
        //    tBody.append(
        //        `<tr>
        //            <td>${vehiculo.id}</td>
        //            <td>${vehiculo.marca}</td>
        //            <td>${vehiculo.modelo}</td>
        //            <td>${vehiculo.precio}</td>
        //            <td>${vehiculo.cantidadPuertas}</td> 
        //            <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
        //        </tr>'); 
        //        `
        //    )
        //}
    });
    $(".modal").modal("hide");
}
function calcularPromedio() {
    var suma = 0;
    var contador = 0;
    if (filtro === "sinfiltro") {
        var objetos = leerLocalStorage();
        var valor = objetos.reduce(function (sumador, item) {
            return sumador + JSON.parse(item).precio;
        }, 0) / objetos.length;
        $("#idProm").val(valor);
    }
    if (filtro === "auto") {
        var objetos = leerLocalStorage();
        var autos = objetos.filter(function (vehiculo) {
            return JSON.parse(vehiculo).cantidadPuertas;
        });
        var valor = autos.reduce(function (sumador, item) {
            return sumador + JSON.parse(item).precio;
        }, 0) / autos.length;
        $("#idProm").val(valor);
    }
    if (filtro === "camioneta") {
        var objetos = leerLocalStorage();
        var camionetas = objetos.filter(function (vehiculo) {
            return JSON.parse(vehiculo).cuatroXcuatro;
        });
        var valor = camionetas.reduce(function (sumador, item) {
            return sumador + JSON.parse(item).precio;
        }, 0) / camionetas.length;
        $("#idProm").val(valor);
    }
}
//function calcularPromedio(){
//    let objetos = leerLocalStorage();
//        let valor = objetos.reduce(function(sumador, item){
//            return sumador + item.precio;
//        },0) / objetos.length;
//    console.log(`El promedio es: ${valor}`);
//    $('#span-promedio').html(valor.toFixed(2));
//}
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
