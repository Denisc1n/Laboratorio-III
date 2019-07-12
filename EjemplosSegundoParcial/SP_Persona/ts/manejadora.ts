
let personas:string[] = (localStorage.getItem('personas') != null) ? JSON.parse(localStorage.getItem('personas')) : [],
    indiceSeleccionado:number;

$(function(){
    $('#btnAgregar').on('click', agregarEmpleado);
    $('#btnModificar').hide();
    $('#btnModificar').click(guardarEmpleado);
    $('#btnCancelar').click(limpiarFormulario);
    $('#mostrar').click(mostrarEmpleados);
    $('#btnFiltrar').click(filtrarPorHorario);
    $('#btnPromediar').click(promedioEdadPorHorario);
    $('#nombreApellido').click(mapear);
})

// Agregar: Ɵene que agregar un nuevo empleado y almacenarlo.
function agregarEmpleado():void{
    let nombre = $('#txtName'),
        apellido = $('#txtLastname'),
        edad = $('#inputAge'),
        horario = $('#selHorario'),
        legajo = $('#legajo');

    //Suponiendo que valido los campos
    let empleado = new Personas.Empleado(   String(nombre.val()), 
                                            String(apellido.val()), 
                                            Number(edad.val()), 
                                            String(horario.val()), 
                                            Number(legajo.val()));
    personas.push(empleado.toJson());
    guardar();   
    limpiarFormulario();                                        
}

function limpiarFormulario():void{
    $('#txtName').val('');
    $('#txtLastname').val('');
    $('#inputAge').val('');
    $('#legajo').val('');
    $('#titulo').html('Alta Empleado');
}

// Mostrar: Debe listar todos los empleados almacenados en una tabla con la opción de Eliminar y Modificar.
function mostrarEmpleados(e?:any):void{
    $('#thAccion').show();
    $('#thEdad').show();
    $('#thHorario').show();
    $('#thLegajo').show();
    !!e && e.preventDefault();
    const tBody = $('#tBody');
    tBody.html('');
    personas.forEach(element => {
        let empleado = JSON.parse(element);
        tBody.append(
            `<tr>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.legajo}</td>
                <td>${empleado.horario}</td>
                <td>
                    <a href="#" onClick="eliminar(${personas.indexOf(element)})"><i class="fas fa-trash-alt mr-2"></i></a> 
                    <a href="#" onClick="modificar(${personas.indexOf(element)})"><i class="fas fa-edit ml-2"></i></a>
                </td>
            </tr>`
        );
    });
}

// Modificar: debe completar todos los datos del empleado en los inputs, cambiar el ơtulo y el name del botón. Al presionar el botón Modificar debe modificar los datos
function modificar(i:number, e?:any):void{
    !!e && e.preventDefault();
    indiceSeleccionado = i;
    $('#titulo').html('Modificar Empleado');
    $('#btnAgregar').hide();
    $('#btnModificar').show();
    //Persona a modificar
    let personaAModificar = JSON.parse(personas[i]);
    //Cargo variables en el formulario
    $('#txtName').val(personaAModificar.nombre);
    $('#txtLastname').val(personaAModificar.apellido);
    $('#inputAge').val(personaAModificar.edad);
    $('#legajo').val(personaAModificar.legajo);
    $('#selHorario').val(personaAModificar.horario);
}

function guardarEmpleado(e?:any):void{
    $('#tBody').html('');
    !!e && e.preventDefault();
    let nombre = $('#txtName'),
        apellido = $('#txtLastname'),
        edad = $('#inputAge'),
        horario = $('#selHorario'),
        legajo = $('#legajo');

    //Empleado modificado
    let empleadoModificado = new Personas.Empleado( String(nombre.val()), 
                                                    String(apellido.val()), 
                                                    Number(edad.val()), 
                                                    String(horario.val()), 
                                                    Number(legajo.val()));
    personas[indiceSeleccionado] = empleadoModificado.toJson();
    $('#btnAgregar').show();
    $('#btnModificar').hide();
    guardar();
    limpiarFormulario();
}

// Eliminar: Debe eliminar el empleado tanto de la tabla como del lugar de almacenamiento.
function eliminar(i:number, e:any):void{
    personas.splice(i, 1);
    guardar();
    mostrarEmpleados();
}

// Filtrar por Horario: debe abrir un modal de bootstrap y permiƟr seleccionar un horario. Al presionar Filtrar debe realizar un filter sobre la lista de empleados dependiendo del horario seleccionado en el input.
function filtrarPorHorario():void{
    let horario = $('#horarioModal').val(),
        objetos = convertirAObjetos(),
        tBody = $('#tBody'),
        filtrados = objetos.filter(element => element.horario === horario);
    tBody.html('');
    $('#thAccion').hide();
    filtrados.forEach(empleado => {
        tBody.append(
            `<tr>
                <td>${empleado.nombre}</td>
                <td>${empleado.apellido}</td>
                <td>${empleado.edad}</td>
                <td>${empleado.legajo}</td>
                <td>${empleado.horario}</td>
            </tr>`
        );
    });
}

// Promedio por Horario: Debe abrir un modal de bootstrap y permiƟr seleccionar un horario. Al presionar Promediar debe realizar un reduce sobre la lista de empleados dependiendo del horario seleccionado en el input y mostrar el resultado en un modal.
function promedioEdadPorHorario():void{
    let horario = $('#horarioModalReduce').val(),
        objetos = convertirAObjetos(),
        valor = objetos.filter(empleado => empleado.horario === horario).reduce(function(sumador, item){
            return sumador + item.edad;
        },0) / objetos.filter(empleado => empleado.horario === horario).length;

    console.log(valor);
    // $('#modalPromedioFinal').html(String(valor.toFixed(2)));
}

//Guarda el array en el localStorage
const guardar = () => {
    localStorage.setItem('personas', JSON.stringify(personas));
}

function convertirAObjetos():any{
    let salida:Personas.Empleado[] =  [];
    personas.forEach(element =>{
        salida.push(JSON.parse(element));
    });
    return salida;
}

//Mapear
function mapear(){
    console.log('Mapear');
    $('#thEdad').hide();
    $('#thHorario').hide();
    $('#thLegajo').hide();
    let objetos = convertirAObjetos(),
        tBody = $('#tBody'),
        filtrados = objetos.map(empleado => ({nombre: empleado.nombre, apellido: empleado.apellido}));
    tBody.html('');
    filtrados.forEach(element => {
        tBody.append(
            `<tr>
                <td>${element.nombre}</td>
                <td>${element.apellido}</td>
                <td>
                    <a href="#" onClick="eliminar(${personas.indexOf(element)})"><i class="fas fa-trash-alt mr-2"></i></a> 
                    <a href="#" onClick="modificar(${personas.indexOf(element)})"><i class="fas fa-edit ml-2"></i></a>
                </td>
            </tr>`
        );
    });
}