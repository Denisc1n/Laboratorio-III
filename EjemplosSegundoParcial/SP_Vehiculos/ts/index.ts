//ARRAY DE ENTIDADES
let entidades:any[] = (localStorage.getItem('entidades') != null) ? JSON.parse(localStorage.getItem('entidades')) : [];
let vehiculo = $('#select-vehiculo').val(),
    filtrarPor = $('#selector-filtro').val();

//GUARDAR EN LOCAL STORAGE
const guardarEnLocalStorage = () => {
    localStorage.setItem('entidades', JSON.stringify(entidades));
}

//LEER LOCAL STORAGE
function leerLocalStorage():any{
    let objetos:any[] =  [];
    entidades.forEach(element =>{
        objetos.push(JSON.parse(element));
    });
    return objetos;
}

$(function(){
  
    $('#btn-limpiarLocal').click(limpiarLocalStorage);
    $('#btn-agregar').click(agregar);
    $('#btn-modificar').click(modificar);
    $('#btn-cancelar').click(cancelar);
    $('#btn-filtrar').click(filtrar);
    $('#select-vehiculo').change(function(){
        vehiculo = String($(this).val());
        console.log(vehiculo);
    });
    $('#selector-filtro').change(function(){
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


function agregar(){

    let id = generarId(),
        marca = $('#input-marca'),
        modelo = $('#input-modelo'),
        precio = $('#input-precio');
    
    let nuevoVehiculo = vehiculo==='Auto' ? new Vehiculos.Auto(id, String(marca.val()), String(modelo.val()),Number(precio.val()), 4) :
                                            new Vehiculos.Camioneta(id, String(marca.val()), String(modelo.val()),Number(precio.val()), true);
    entidades.push(nuevoVehiculo.toJson());
    guardarEnLocalStorage();
    mostrarEmpleados();
}

function modificar(){
    console.log('Modificar');
}

function eliminar(i:number, e:any):void{
    entidades.splice(i, 1);
    guardarEnLocalStorage();
    mostrarEmpleados();
}
function cancelar(){
    console.log(generarId());
}

function generarId():number{
    let objetos = leerLocalStorage(),
    id =  objetos.reduce((maxId, item) => {
       if(maxId < item.id){
           maxId = item.id;
       } 
       return maxId;
    },1);
    return id +1;
}

function mostrarEmpleados(e?:any):void{
    !!e && e.preventDefault();
    const tBody = $('#tBody');
    tBody.html('');
    entidades.forEach(element => {
        let vehiculo = JSON.parse(element);
        tBody.append(
            `<tr>
                <td class="column1">${vehiculo.id}</td>
                <td class="column2">${vehiculo.marca}</td>
                <td class="column3">${vehiculo.modelo}</td>
                <td class="column4">${vehiculo.precio}</td>
                <td class="column5">
                    <input type="button" onClick="eliminar(${entidades.indexOf(element)})" value="Eliminar" class="btn btn-danger">
                </td>
            </tr>`
        );
    });
}

function limpiarLocalStorage(){
    // localStorage.clear();
    console.log('Limpio local storage');
}

function calcularPromedio(){
    let objetos = leerLocalStorage(),
        valor = objetos.reduce(function(sumador, item){
            return sumador + item.precio;
        },0) / objetos.length;
    console.log(`El promedio es: ${valor}`);
    $('#span-promedio').html(valor.toFixed(2));
}

function filtrar(){
    let objetos = leerLocalStorage(),
        camionetas = objetos.filter(vehiculo => vehiculo.cuatroXcuatro),
        autos = objetos.filter(vehiculo => vehiculo.cantidadPuertas);
    console.log('camionetas');
    console.log(camionetas);
    console.log('autos');
    console.log(autos);
}

filtrar();