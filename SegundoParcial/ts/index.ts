
//GUARDAR EN LOCAL STORAGE
const guardarEnLocalStorage = (entidades:[]) => {
    localStorage.setItem('entidades', JSON.stringify(entidades));
}
//LEER LOCAL STORAGE
function leerLocalStorage():any{

    let entidades
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
    console.log($('#numId').val());
    let modelo:String   = String($('#inputModelo').val());
    let marca:String    = String($('#inputMarca').val());
    let precio:Number   = Number($('#inputPrecio').val());
    let tipo            = $('input[name=vtype]:checked').val();
   
    
    if(tipo ==="auto")
    {
        let nuevoAuto;
        let detalle:Number  = Number($('input[name=car]:checked').val() === "true"? 3 : 5);
        nuevoAuto = new Classes.Auto(id, marca,modelo,precio,detalle);
        console.log(nuevoAuto);
    }
    else{
        let detalle:Boolean  = Boolean($('input[name=car]:checked').val() === "true"? true : false);
        let nuevaCamioneta = new Classes.Camioneta(id, marca,modelo,precio,detalle);
    }
    
}
function calcularID() {
    var entidades = leerLocalStorage();
    var id = entidades.reduce(function(id:number,entidad:any){
        if(entidad.id>id)
            return id = entidad.id;   
    },0);
    $('#numId').val(id+1);
}
function filtrar() {
    console.log('Filtrar');
}
