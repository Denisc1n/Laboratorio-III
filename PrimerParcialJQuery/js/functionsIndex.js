var miVariableFantasma;

$(document).ready(function() {
    $("#buttonClose").click(cerrar);
    $("#buttonSave").click(modificar);
    $("#deleteButton").click(eliminar);
    loadTable();
});

function loadTable() {
    $.get("http://localhost:3000/materias",
    function (data, status) {
      if(status == "success"){
        var materias = data;
        var tbodyObject = $("#tableBody");
        console.log(tbodyObject);
        materias.forEach(materia => {
            var elementoTr = document.createElement('tr');
        
            elementoTr.addEventListener('dblclick',abrir);
            tbodyObject.append(elementoTr);
            elementoTr.appendChild(generateTd(materia.id));
            elementoTr.appendChild(generateTd(materia.nombre));
            elementoTr.appendChild(generateTd(materia.cuatrimestre));
            elementoTr.appendChild(generateTd(materia.fechaFinal));
            elementoTr.appendChild(generateTd(materia.turno));
        });
      }
      else{
        console.log("Error en la respuesta del servidor Numero: "+status);
    }
    });
}

function abrir(e) {
    var $fieldSet = $("#fieldset");
    miVariableFantasma = e.target.parentNode;
    var puntoDeInicio = e.target.parentNode.firstChild;
    $("#idH").val(puntoDeInicio.innerHTML);
    console.log(puntoDeInicio.nextSibling.innerHTML)
    $("#inputName").val(puntoDeInicio.nextSibling.innerHTML);
    $("#inputCuatrimestre")[0].selectedIndex = parseInt(puntoDeInicio.nextSibling.nextSibling.innerHTML)-1;
    $("#inputCuatrimestre").prop('disabled','disabled');
    var turno = puntoDeInicio.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    if(turno === "Mañana")
    $('#inputTurnoM').prop('checked', true);
    else
        $('#inputTurnoN').prop('checked', true);
    
    var fecha = puntoDeInicio.nextSibling.nextSibling.nextSibling.innerHTML;
    nuevaFecha = fecha.split('/');
    $('#inputDob').val(nuevaFecha[2]+"-"+nuevaFecha[1]+"-"+nuevaFecha[0]);


    $fieldSet.attr("hidden", false);
 }

function cerrar(){
    var $fieldSet = $("#fieldset");
    $fieldSet.attr("hidden", true);
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


function modificar() {
    var idR = parseInt($('#idH').val());
    var nombreR = $('#inputName').val();
    var cuatrimestreR = $('#inputCuatrimestre').val();
    var fechaR = $('#inputDob').val();
    var turno = $('input:radio[name=turno]:checked').val();
    var array = fechaR.split('-');

    var str = array[2]+"/"+array[1]+"/"+array[0];
    var hasError = false;
    if(validDate(fechaR) === false){
        hasError = true;
        $("#inputDob").addClass("error");
    }

    if( (nombreR.length < 6) )
    {
        $("#inputName").addClass("error");
        hasError = true;
    }
    if(nombreR.value==""){    
        $("#inputName").addClass("error");
        hasError = true;
    }

    if(hasError)
        return;

    var obj = { id: idR, nombre:nombreR, cuatrimestre:parseInt(cuatrimestreR)+1,fechaFinal:str,turno:turno}
    salida = JSON.stringify(obj);
    interactGif(false);

    $.post("http://localhost:3000/editar",
            obj,
            function(data, status){
                if(status == "success"){
                    interactGif(true);
                    var hijos = miVariableFantasma.children;
                    hijos[1].innerHTML = $('#inputName').val();
                    var fechaR = $('#inputDob').val();
                    var array = fechaR.split('-');
                    var str = array[2]+"/"+array[1]+"/"+array[0];
                    hijos[3].innerHTML = str;
                    hijos[4].innerHTML = $('input:radio[name=turno]:checked').val();
    
                    cerrar();
                  }
                  else{
                    console.log("Error en la respuesta del servidor Numero: "+status);
                }
            });

}

function eliminar() {
    interactGif(false);
    var idR = $('#idH').val();
    var obj = { id: idR };
    $.post("http://localhost:3000/eliminar",
            obj,
            function(data, status) {
                if(status == "success"){
                    interactGif(true);
                    miVariableFantasma.parentNode.removeChild(miVariableFantasma);
                    cerrar();
                  }
                  else{
                    console.log("Error en la respuesta del servidor Numero: "+status);
                } 
            });
}

function interactGif(status){
    var spinner = $("#hiddenDiv");
    spinner.attr("hidden", status);
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

/*var request = new XMLHttpRequest();  
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
    miVariableFantasma = e.srcElement.parentNode;
    puntoDeInicio = e.srcElement.parentNode.firstChild;
    get('idH').value = puntoDeInicio.innerHTML;
    get('inputName').value = puntoDeInicio.nextSibling.innerHTML;
    get('inputCuatrimestre').selectedIndex = parseInt(puntoDeInicio.nextSibling.nextSibling.innerHTML)-1;
    get('inputCuatrimestre').disabled = true;
    var turno = puntoDeInicio.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML;
    if(turno === "Mañana")
        get('inputTurnoM').checked = true;
       
    else
        get('inputTurnoN').checked= true;

    var fecha = puntoDeInicio.nextSibling.nextSibling.nextSibling.innerHTML;
    nuevaFecha = fecha.split('/');
    get('inputDob').value = nuevaFecha[2]+"-"+nuevaFecha[1]+"-"+nuevaFecha[0];

    $fieldSet.hidden=false;

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
}*/