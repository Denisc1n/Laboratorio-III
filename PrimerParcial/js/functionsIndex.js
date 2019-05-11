var request = new XMLHttpRequest();  
window.onload = loadEvents;


function loadEvents(){
    get("buttonClose").addEventListener("click",cerrar);
    get('buttonSave').addEventListener("click",modificar);
    get('deleteButton').addEventListener("click",eliminar);
    loadTable();
}

function loadTable() {
    request.open("GET", "http://localhost:3000/materias", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = callback;
    request.send();
}

function callback() {

    if (request.readyState === 4) {
        if (request.status === 200) {
            var materias = JSON.parse(request.responseText);
            var tbodyObject = document.getElementById("tableBody");
            
            materias.forEach(materia => {
                var elementoTr = document.createElement('tr');
            
                elementoTr.addEventListener('dblclick',abrir);
                tbodyObject.appendChild(elementoTr);
                elementoTr.appendChild(generateTd(materia.id));
                elementoTr.appendChild(generateTd(materia.nombre));
                elementoTr.appendChild(generateTd(materia.cuatrimestre));
                elementoTr.appendChild(generateTd(materia.fechaFinal));
                elementoTr.appendChild(generateTd(materia.turno));
            });
        }
        else{
            console.log("Error en la respuesta del servidor Numero: "+request.status);
        }
    }
}

function abrir(e){
    var $fieldSet = get("fieldset");
    var $button = get("addButton");

    puntoDeInicio = e.srcElement.parentNode.firstChild;
    get('idH').value = puntoDeInicio.innerHTML;
    get('inputName').value = puntoDeInicio.nextSibling.innerHTML;
    get('inputCuatrimestre').selectedIndex = parseInt(puntoDeInicio.nextSibling.nextSibling.innerHTML)-1;
    get('inputCuatrimestre').disabled = true;
    var turno = puntoDeInicio.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    if(turno === "Mañana")
    {
        get('inputTurnoM').checked = true;
        get('inputTurnoN').checked = false;
    }
       
    else{
        get('inputTurnoN').checked= true;
        get('inputTurnoM').checked = false;
    }

    var fecha = puntoDeInicio.nextSibling.nextSibling.nextSibling.innerHTML;
    nuevaFecha = fecha.split('/');
    get('inputDob').value = nuevaFecha[2]+"-"+nuevaFecha[1]+"-"+nuevaFecha[0];

    $fieldSet.hidden=false;

}

function cerrar(){
    var $fieldSet = get("fieldset");
    var $button = get("addButton");
    $fieldSet.hidden=true;
}

function get(id) {
    var retorno = document.getElementById(id);
    return retorno;
}

function generateTd (data){
    
        var elementoTd = document.createElement('td');
        var elementoText = document.createTextNode(data);
        elementoTd.appendChild( elementoText );
        return elementoTd;
    }

function modificar(){
    interactGif(false);
    var nombreR = get('inputName').value;
    var cuatrimestreR = get('inputCuatrimestre').value;
    var fechaR = get('inputDob').value;
    var m = get('inputTurnoM').checked;
    var n = get('inputTurnoN').checked;
    var idR = get('idH').value;
    var turno = "Mañana"
    if(m === false){
        turno == "Noche";
    }

    if( (nombreR.length < 6) )
    {
        if(nombreR.value==""){    
            document.getElementById("inputName").className = "error";
        }

        if(m == false && n == false){
            document.getElementById("inputName").className = "error";
        }
        return;
    }

    var obj = { id: idR, nombre:nombreR, cuatrimestre:parseInt(cuatrimestreR)+1,fecha:fechaR,turno:turno}
    salida = JSON.stringify(obj);
    console.log(salida);
    request.open("POST","http://localhost:3000/editar",true);
    request.onreadystatechange = callbackModificacion;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(salida);
    
}

function eliminar(){
    interactGif(false);
    var idR = get('idH').value;
    var obj = { id: idR }
    salida = JSON.stringify(obj);
    request.open("POST","http://localhost:3000/eliminar",true);
    request.onreadystatechange = callbackModificacion;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(salida);
}

function callbackModificacion(){
    console.log("llego");
    interactGif(true);
}


function interactGif(status){
    var spinner = document.getElementById("hiddenDiv");
    spinner.hidden = status;
}
