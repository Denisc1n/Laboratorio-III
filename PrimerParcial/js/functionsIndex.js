var request = new XMLHttpRequest();  
window.onload = loadEvents;
var miVariableFantasma;

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
    miVariableFantasma = e.srcElement.parentNode;
    puntoDeInicio = e.srcElement.parentNode.firstChild;
    get('idH').value = puntoDeInicio.innerHTML;
    get('inputName').value = puntoDeInicio.nextSibling.innerHTML;
    get('inputCuatrimestre').selectedIndex = parseInt(puntoDeInicio.nextSibling.nextSibling.innerHTML)-1;
    get('inputCuatrimestre').disabled = true;
    var turno = puntoDeInicio.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    /* */
    if(turno === "Mañana")
        get('inputTurnoM').checked = true;
       
    else
        get('inputTurnoN').checked= true;

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
    
    var nombreR = get('inputName').value;
    var cuatrimestreR = get('inputCuatrimestre').value;
    var fechaR = get('inputDob').value;
    var m = get('inputTurnoM').checked;
    var n = get('inputTurnoN').checked;
    var idR = parseInt(get('idH').value);
    var turno = "Mañana"
    if(m === false){
        turno == "Noche";
    }
    var array = fechaR.split('-');

    var str = array[2]+"/"+array[1]+"/"+array[0];
    hasError = false;
    if(validDate(fechaR) === false){
        hasError = true;
        document.getElementById("inputDob").className = "error";
    }
    

    if( (nombreR.length < 6) )
    {
        document.getElementById("inputName").className = "error";
        hasError = true;
    }
    if(nombreR.value==""){    
        document.getElementById("inputName").className = "error";
        hasError = true;
    }

    if(m == false && n == false){
        document.getElementById("inputName").className = "error";
        hasError = true;
    }


    if(hasError)
        return;

    document.getElementById("inputName").classList.remove('error');
    document.getElementById("inputDob").classList.remove("error");
    interactGif(false);

    var obj = { id: idR, nombre:nombreR, cuatrimestre:parseInt(cuatrimestreR)+1,fechaFinal:str,turno:turno}
    salida = JSON.stringify(obj);
    request.open("POST","http://localhost:3000/editar",true);
    request.onreadystatechange = callbackModificacion;
    request.setRequestHeader("Content-type","application/json");
    request.send(salida);
    
}

function eliminar(){
    interactGif(false);
    var idR = get('idH').value;
    var obj = { id: idR }
    salida = JSON.stringify(obj);
    request.open("POST","http://localhost:3000/eliminar",true);
    request.onreadystatechange = callbackEliminar;
    request.setRequestHeader("Content-type","application/json");
    request.send(salida);
}

function callbackModificacion(){
    if( request.readyState === 4){
        if(request.status === 200){
                var response = JSON.parse(request.responseText);
                console.log(response);
                interactGif(true);
                var hijos = miVariableFantasma.children;
                hijos[1].innerHTML = get('inputName').value;

                var fechaR = get('inputDob').value;
                var array = fechaR.split('-');
                var str = array[2]+"/"+array[1]+"/"+array[0];
                hijos[3].innerHTML = str;
               if( get('inputTurnoM').checked )
                    hijos[4].innerHTML = "Mañana";
                else 
                    hijos[4].innerHTML = "Noche";

                cerrar();

                }
            else{
                console.log("Error en la respuesta del servidor.", request.status);
            }
    }
}


function callbackEliminar(){
    if( request.readyState === 4){
        if(request.status === 200){
                var response = JSON.parse(request.responseText);
                console.log(response);
                interactGif(true);
                miVariableFantasma.parentNode.removeChild(miVariableFantasma);
            }
            else{
                console.log("Error en la respuesta del servidor.", request.status);
            }
    }
}



function interactGif(status){
    var spinner = document.getElementById("hiddenDiv");
    spinner.hidden = status;
}

function validDate( date ){
    var test = date.split('-');

    currentDate = new Date().getFullYear();
    currentDay = new Date().getDay();

    if( test[0] > currentDate+1 || test[0]< currentDate)
        return false;
    else 
        return true;
    
}
