"use strict";
var personas = (localStorage.getItem('personas') != null) ? JSON.parse(localStorage.getItem('personas')) : [], indiceSeleccionado;
$(function () {
    $('#btnAgregar').on('click', agregarEmpleado);
    $('#btnModificar').hide();
    $('#btnModificar').click(guardarEmpleado);
    $('#btnCancelar').click(limpiarFormulario);
    $('#mostrar').click(mostrarEmpleados);
    $('#btnFiltrar').click(filtrarPorHorario);
    $('#btnPromediar').click(promedioEdadPorHorario);
    $('#nombreApellido').click(mapear);
});
// Agregar: Ɵene que agregar un nuevo empleado y almacenarlo.
function agregarEmpleado() {
    var nombre = $('#txtName'), apellido = $('#txtLastname'), edad = $('#inputAge'), horario = $('#selHorario'), legajo = $('#legajo');
    //Suponiendo que valido los campos
    var empleado = new Personas.Empleado(String(nombre.val()), String(apellido.val()), Number(edad.val()), String(horario.val()), Number(legajo.val()));
    personas.push(empleado.toJson());
    guardar();
    limpiarFormulario();
}
function limpiarFormulario() {
    $('#txtName').val('');
    $('#txtLastname').val('');
    $('#inputAge').val('');
    $('#legajo').val('');
    $('#titulo').html('Alta Empleado');
}
// Mostrar: Debe listar todos los empleados almacenados en una tabla con la opción de Eliminar y Modificar.
function mostrarEmpleados(e) {
    $('#thAccion').show();
    $('#thEdad').show();
    $('#thHorario').show();
    $('#thLegajo').show();
    !!e && e.preventDefault();
    var tBody = $('#tBody');
    tBody.html('');
    personas.forEach(function (element) {
        var empleado = JSON.parse(element);
        tBody.append("<tr>\n                <td>" + empleado.nombre + "</td>\n                <td>" + empleado.apellido + "</td>\n                <td>" + empleado.edad + "</td>\n                <td>" + empleado.legajo + "</td>\n                <td>" + empleado.horario + "</td>\n                <td>\n                    <a href=\"#\" onClick=\"eliminar(" + personas.indexOf(element) + ")\"><i class=\"fas fa-trash-alt mr-2\"></i></a> \n                    <a href=\"#\" onClick=\"modificar(" + personas.indexOf(element) + ")\"><i class=\"fas fa-edit ml-2\"></i></a>\n                </td>\n            </tr>");
    });
}
// Modificar: debe completar todos los datos del empleado en los inputs, cambiar el ơtulo y el name del botón. Al presionar el botón Modificar debe modificar los datos
function modificar(i, e) {
    !!e && e.preventDefault();
    indiceSeleccionado = i;
    $('#titulo').html('Modificar Empleado');
    $('#btnAgregar').hide();
    $('#btnModificar').show();
    //Persona a modificar
    var personaAModificar = JSON.parse(personas[i]);
    //Cargo variables en el formulario
    $('#txtName').val(personaAModificar.nombre);
    $('#txtLastname').val(personaAModificar.apellido);
    $('#inputAge').val(personaAModificar.edad);
    $('#legajo').val(personaAModificar.legajo);
    $('#selHorario').val(personaAModificar.horario);
}
function guardarEmpleado(e) {
    $('#tBody').html('');
    !!e && e.preventDefault();
    var nombre = $('#txtName'), apellido = $('#txtLastname'), edad = $('#inputAge'), horario = $('#selHorario'), legajo = $('#legajo');
    //Empleado modificado
    var empleadoModificado = new Personas.Empleado(String(nombre.val()), String(apellido.val()), Number(edad.val()), String(horario.val()), Number(legajo.val()));
    personas[indiceSeleccionado] = empleadoModificado.toJson();
    $('#btnAgregar').show();
    $('#btnModificar').hide();
    guardar();
    limpiarFormulario();
}
// Eliminar: Debe eliminar el empleado tanto de la tabla como del lugar de almacenamiento.
function eliminar(i, e) {
    personas.splice(i, 1);
    guardar();
    mostrarEmpleados();
}
// Filtrar por Horario: debe abrir un modal de bootstrap y permiƟr seleccionar un horario. Al presionar Filtrar debe realizar un filter sobre la lista de empleados dependiendo del horario seleccionado en el input.
function filtrarPorHorario() {
    var horario = $('#horarioModal').val(), objetos = convertirAObjetos(), tBody = $('#tBody'), filtrados = objetos.filter(function (element) { return element.horario === horario; });
    tBody.html('');
    $('#thAccion').hide();
    filtrados.forEach(function (empleado) {
        tBody.append("<tr>\n                <td>" + empleado.nombre + "</td>\n                <td>" + empleado.apellido + "</td>\n                <td>" + empleado.edad + "</td>\n                <td>" + empleado.legajo + "</td>\n                <td>" + empleado.horario + "</td>\n            </tr>");
    });
}
// Promedio por Horario: Debe abrir un modal de bootstrap y permiƟr seleccionar un horario. Al presionar Promediar debe realizar un reduce sobre la lista de empleados dependiendo del horario seleccionado en el input y mostrar el resultado en un modal.
function promedioEdadPorHorario() {
    var horario = $('#horarioModalReduce').val(), objetos = convertirAObjetos(), valor = objetos.filter(function (empleado) { return empleado.horario === horario; }).reduce(function (sumador, item) {
        return sumador + item.edad;
    }, 0) / objetos.filter(function (empleado) { return empleado.horario === horario; }).length;
    console.log(valor);
    // $('#modalPromedioFinal').html(String(valor.toFixed(2)));
}
//Guarda el array en el localStorage
var guardar = function () {
    localStorage.setItem('personas', JSON.stringify(personas));
};
function convertirAObjetos() {
    var salida = [];
    personas.forEach(function (element) {
        salida.push(JSON.parse(element));
    });
    return salida;
}
//Mapear
function mapear() {
    console.log('Mapear');
    $('#thEdad').hide();
    $('#thHorario').hide();
    $('#thLegajo').hide();
    var objetos = convertirAObjetos(), tBody = $('#tBody'), filtrados = objetos.map(function (empleado) { return ({ nombre: empleado.nombre, apellido: empleado.apellido }); });
    tBody.html('');
    filtrados.forEach(function (element) {
        tBody.append("<tr>\n                <td>" + element.nombre + "</td>\n                <td>" + element.apellido + "</td>\n                <td>\n                    <a href=\"#\" onClick=\"eliminar(" + personas.indexOf(element) + ")\"><i class=\"fas fa-trash-alt mr-2\"></i></a> \n                    <a href=\"#\" onClick=\"modificar(" + personas.indexOf(element) + ")\"><i class=\"fas fa-edit ml-2\"></i></a>\n                </td>\n            </tr>");
    });
}
