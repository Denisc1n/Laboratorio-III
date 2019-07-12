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
    $('#btnGuardarEdicion').click(editarVehiculo);
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
    //$("#modalAgregar")
    //.find("input,textarea,select")
    //   .val('')
    //   .end();
    //$(".modal").modal("hide");
    
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
        tBody.append(
            `<tr>
                <td>${vehiculo.id}</td>
                <td>${vehiculo.marca}</td>
                <td>${vehiculo.modelo}</td>
                <td>${vehiculo.precio}</td>
                <td>${vehiculo.cuatroXcuatro == null ? vehiculo.cantidadPuertas : vehiculo.cuatroXcuatro}</td> 
                <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a>
                    <a href="#" class="btn btn-success" onClick="modificar(${objetos.indexOf(element)})">Modificar</a>
                </td> 
            </tr>'); 
            `
        )
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
        tBody.append(
            `<tr>
                <td>${vehiculo.id}</td>
                <td>${vehiculo.marca}</td>
                <td>${vehiculo.modelo}</td>
                <td>${vehiculo.precio}</td>
                <td>${vehiculo.cuatroXcuatro == undefined ? vehiculo.cantidadPuertas : vehiculo.cuatroXcuatro}</td> 
                <td> <a href="#" class="btn btn-danger" onClick="eliminar(${objetos.indexOf(element)})">Eliminar</a>
                    <a href="#" class="btn btn-success" onClick="modificar(${objetos.indexOf(element)})">Modificar</a>
                </td> 
            </tr>'); 
            `
        )
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

function calcularPromedio():void{
    let suma: number = 0;
    let contador:number = 0;
    if(filtro === "sinfiltro"){
        let objetos = leerLocalStorage();
        let valor = objetos.reduce(function(sumador, item){
            return sumador + JSON.parse(item).precio;        
        },0) / objetos.length;
        $("#idProm").val(valor);
    }
    if(filtro === "auto"){
        let objetos = leerLocalStorage();
        let autos = objetos.filter(function(vehiculo){
            return JSON.parse(vehiculo).cantidadPuertas;
        });
        let valor = autos.reduce(function(sumador, item){
           return sumador + JSON.parse(item).precio;   
        },0) / autos.length;
        $("#idProm").val(valor);
    }
    if(filtro === "camioneta"){
        let objetos = leerLocalStorage();
        let camionetas = objetos.filter(function(vehiculo){
            return JSON.parse(vehiculo).cuatroXcuatro;
        });
        let valor = camionetas.reduce(function(sumador, item){
           return sumador + JSON.parse(item).precio;   
        },0) / camionetas.length;
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

function modificar(i:number){
    let entidades = leerLocalStorage();
    let seleccion;
    entidades.forEach(element => {
        let jsonElement = JSON.parse(element);
        if(jsonElement.id == (i+1)){
            seleccion = jsonElement;
        }
    });
    $("#numIdEdit").val(seleccion.id);
    $("#txtMarcaEdit").val(seleccion.marca);
    $("#txtModeloEdit").val(seleccion.modelo);
    $("#numPrecioEdit").val(seleccion.precio);
    if( seleccion.cuatroXcuatro != undefined ){
        $("#chkCamioEdit").attr('checked',true);
        $('#hiddenCharEdit input[name=car]').remove();
        $('#hiddenCharEdit label').remove();
        $('#hiddenCharEdit').append("<input type='radio' name='car' value='true'/><label>4x4</label> <input type='radio' name='car'value='false' checked/><label>4x2</label>");
    }
    else{
        $('#hiddenCharEdit input[name=car]').remove();
        $('#hiddenCharEdit label').remove();
        $("#chkAutoEdit").attr('checked',true);
        $('#hiddenCharEdit').append("<input type='radio' name='car' value='true'/><label>Coupe</label> <input type='radio' name='car'value='false' checked/><label>Sedan</label>");
    }

    $("#modalEditar").modal('show');
}

function editarVehiculo(){
    let vehiculos = leerLocalStorageJSON();

    var id:Number       = Number($('#numIdEdit').val());
    let modelo:String   = String($('#txtModeloEdit').val());
    let marca:String    = String($('#txtMarcaEdit').val());
    let precio:Number   = Number($('#numPrecioEdit').val());
    let tipo            = $('input[name=vtypeEdit]:checked').val();
    let auxVehiculos:any[] = [];
    if(tipo ==="auto")
    {
        let nuevoAuto;
        let detalle:String  = String($('input[name=car]:checked').val() === "true"? "Coupe" : "Sedan");
        nuevoAuto = new Classes.Auto(id, marca,modelo,precio,detalle);
        
        
      vehiculos.forEach(element => {
        if( element.id == nuevoAuto.id ){
                  console.log("edito");
                  element.marca = nuevoAuto.marca;
                  element.modelo = nuevoAuto.modelo;
                  element.precio = nuevoAuto.precio;
                  if( detalle == "Sedan"){
                      element.cantidadPuertas = "Sedan";
                  }
                  else{
                      element.cantidadPuertas = "Coupe";
                  }
        }
      });
      vehiculos.forEach(element => {
        auxVehiculos.push(JSON.stringify(element));
      });
       console.log(auxVehiculos);
        guardarEnLocalStorage(auxVehiculos);
        mostrarVehiculos();
    }
    else{
        let detalle:string  = $('input[name=car]:checked').val() === "true"? "4x4" : "4x2";
        let nuevaCamioneta = new Classes.Camioneta(id, marca,modelo,precio,detalle);
        let auxVehiculos:any[] = [];
        
        vehiculos.forEach(element => {
          if( element.id == nuevaCamioneta.id ){
                    console.log("edito");
                    element.marca = nuevaCamioneta.marca;
                    element.modelo = nuevaCamioneta.modelo;
                    element.precio = nuevaCamioneta.precio;
                    if( detalle == "4x4"){
                        element.cuatroXcuatro = "4x4";
                    }
                    else{
                        element.cuatroXcuatro = "4x2";
                    }
          }
        });
        vehiculos.forEach(element => {
          auxVehiculos.push(JSON.stringify(element));
        });
         console.log(auxVehiculos);
          guardarEnLocalStorage(auxVehiculos);
          mostrarVehiculos();
    }
}

//LEER LOCAL STORAGE
function leerLocalStorageJSON():any{
    let objetos:any[] =  [];
    let entidades:any[] = (localStorage.getItem('entidades') != null) ? JSON.parse(localStorage.getItem('entidades')) : [];
    entidades.forEach(element =>{
        objetos.push(JSON.parse(element));
    });
    return objetos;
}
