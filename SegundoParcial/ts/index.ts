let filtro = "sinfiltro";
//GUARDAR EN LOCAL STORAGE
const guardarEnLocalStorage = (entidades:[]) => {
    localStorage.setItem('entidades', JSON.stringify(entidades));
}
//LEER LOCAL STORAGE
function leerLocalStorage():any{

    let entidades;
    if(localStorage.getItem('entidades') != null){
        entidades = JSON.parse(localStorage.getItem('entidades'));
    }
    else{
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
    $('#checkboxes').on('click',"input[type=checkbox]",mostrarOcultarColumna);
    mostrarVehiculos();
});

function mostrarCaracteristica() {
    if($('input[name=vtype]:checked').val() === "auto"){
        $('#hiddenChar input[name=car]').remove();
        $('#hiddenChar label').remove();
        $('#hiddenChar').append("<input type='radio' name='car' value='true'/><label>Coupe</label> <input type='radio' name='car'value='false' checked/><label>Sedan</label>");
        $('#hiddenChar').attr('hidden',false);
    }
    if($('input[name=vtype]:checked').val() === "camioneta"){
        $('#hiddenChar input[name=car]').remove();
        $('#hiddenChar label').remove();
        $('#hiddenChar').append("<input type='radio' name='car' value='true'/><label>4x4</label> <input type='radio' name='car'value='false' checked/><label>4x2</label>");
        $('#hiddenChar').attr('hidden',false);
    }
}
function guardarVehiculo() {

    var id:Number       = Number($('#numId').val());
    let modelo:String   = String($('#txtModelo').val());
    let marca:String    = String($('#txtMarca').val());
    let precio:Number   = Number($('#numPrecio').val());
    let tipo            = $('input[name=vtype]:checked').val();
   
    
    if(tipo ==="auto")
    {
        let nuevoAuto;
        let detalle:String  = String($('input[name=car]:checked').val() === "true"? "Coupe" : "Sedan");
        nuevoAuto = new Classes.Auto(id, marca,modelo,precio,detalle);
        let entidades = leerLocalStorage();
        entidades.push(nuevoAuto.toJson());
        guardarEnLocalStorage(entidades);
        mostrarVehiculos();
    }
    else{
        let detalle:string  = $('input[name=car]:checked').val() === "true"? "4x4" : "4x2";
        let nuevaCamioneta = new Classes.Camioneta(id, marca,modelo,precio,detalle);
        let entidades = leerLocalStorage();
        entidades.push(nuevaCamioneta.toJson());
        guardarEnLocalStorage(entidades);
        mostrarVehiculos();
    }

    $(".modal").modal("hide");
    
}
function calcularID(){
    var entidades = leerLocalStorage();
    let id =  entidades.reduce((maxId, item) => {
        let vehiculo = JSON.parse(item);
        if(maxId < vehiculo.id){
            maxId = vehiculo.id;
        } 
        return maxId;
     },0);
     $('#numId').val(id+1);
}
function mostrarVehiculos():void{
    const tBody = $('#tBody');
    tBody.html('').find("tr:gt(0)").remove();
    let objetos = leerLocalStorage();
    objetos.forEach(element => {
        let vehiculo = JSON.parse(element);
        if( vehiculo.cuatroXcuatro != null )
        {
            tBody.append(
                `<tr>
                    <td>${vehiculo.id}</td>
                    <td class="marca">${vehiculo.marca}</td>
                    <td class="modelo">${vehiculo.modelo}</td>
                    <td class="precio">${vehiculo.precio}</td>
                    <td class="caracteristica">${vehiculo.cuatroXcuatro}</td> 
                    <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
                </tr>'); 
                `
            )
        }
        else{
            tBody.append(
                `<tr>
                    <td>${vehiculo.id}</td>
                    <td class="marca">${vehiculo.marca}</td>
                    <td class="modelo">${vehiculo.modelo}</td>
                    <td class="precio">${vehiculo.precio}</td>
                    <td class="caracteristica">${vehiculo.cantidadPuertas}</td> 
                    <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
                </tr>'); 
                `
            )
        }
    });
}

function eliminar(i:number){
    let entidades = leerLocalStorage();
    entidades.splice(i, 1);
    guardarEnLocalStorage(entidades);
    mostrarVehiculos();
}

function limpiarAlmacenamiento():void{
    //localStorage.clear();
    console.log("Limpie el Storage");
}

function filtrarPor():void{
    let seleccion = $('#filtrarPor').val();
    let listafiltrada;
    if( seleccion === "auto" ){
        let entidades = leerLocalStorage();
        listafiltrada = entidades.filter(function(entidad){
            let jsonentidad = JSON.parse(entidad);
            console.log(jsonentidad.cantidadPuertas);
            if(jsonentidad.cantidadPuertas != undefined)
                return jsonentidad;
        });
        filtro = "auto";
    }
    else if( seleccion === "camioneta" ){
        let entidades = leerLocalStorage();
        listafiltrada = entidades.filter(function(entidad){
            let jsonentidad = JSON.parse(entidad);
            if(jsonentidad.cuatroXcuatro != undefined)
                return jsonentidad;
        });
        filtro = "camioneta";
    }
    else{
        filtro = "sinfiltro";
        listafiltrada = leerLocalStorage();
    }
    mostrarListaFiltrada(listafiltrada);
}

function mostrarListaFiltrada(lista:[]):void{
    const tBody = $('#tBody');
    tBody.html('').find("tr:gt(0)").remove();
    let objetos = lista;
    objetos.forEach(element => {
        let vehiculo = JSON.parse(element);
        if( vehiculo.cuatroXcuatro != null )
        {
            tBody.append(
                `<tr>
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.precio}</td>
                    <td>${vehiculo.cuatroXcuatro}</td> 
                    <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
                </tr>'); 
                `
            )
        }
        else{
            tBody.append(
                `<tr>
                    <td>${vehiculo.id}</td>
                    <td>${vehiculo.marca}</td>
                    <td>${vehiculo.modelo}</td>
                    <td>${vehiculo.precio}</td>
                    <td>${vehiculo.cantidadPuertas}</td> 
                    <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a></td> 
                </tr>'); 
                `
            )
        }
    });
    $(".modal").modal("hide");
}

function calcularPromedio():void{
    let suma: number = 0;
    let contador:number = 0;
    $("#myTable").find('> tbody > tr').each(function () {
        suma+=parseInt($(this).find('td').eq(3).html());
        contador++;
    });
    let resultado = suma/contador;
    $("#idProm").val(resultado);
}

function mostrarOcultarColumna(){

    $("input:checkbox:not(:checked)").each(function() {
        var column = "table ." + $(this).attr("name");
        $(column).hide();
    });
    
    $("input:checkbox").click(function(){
        var column = "table ." + $(this).attr("name");
        $(column).toggle();
    });
}
