var request = new XMLHttpRequest();  
window.onload = loadEvents;


function loadEvents(){
    get("addButton").addEventListener("click",abrir);
    get("buttonClose").addEventListener("click",cerrar);
    loadTable();
}

function loadTable() {
    request.open("GET", "ipservidor", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.onreadystatechange = callback;
    request.send();
}

function callback() {

    if (request.readyState === 4) {
        if (request.status === 200) {
            var returnServer = JSON.parse(request.responseText);
            console.log(returnServer);
            
        }
        else{
            console.log("Error en la respuesta del servidor Numero: "+request.status);
        }
    }
}

function abrir(){
    var $fieldSet = get("fieldset");
    var $button = get("addButton");
    $fieldSet.hidden=false;
    $button.hidden = true;
}

function cerrar(){
    var $fieldSet = get("fieldset");
    var $button = get("addButton");
    $fieldSet.hidden=true;
    $button.hidden = false;
}

function get(id) {
    var retorno = document.getElementById(id);
    return retorno;
}
