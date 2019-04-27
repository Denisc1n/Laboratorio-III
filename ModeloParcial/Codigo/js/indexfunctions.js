window.onload = loadEvents;
var request = new XMLHttpRequest();
function loadEvents()
{

    document.getElementById("newPost").addEventListener("click",abrir);
    document.getElementById("buttonClose").addEventListener("click",cerrar);
    document.getElementById("saveButton").addEventListener("click",cargarPost);
    var color = getParameterByName("color", window.url);
    var font = getParameterByName("font", window.url);
    var email = getParameterByName("email", window.url);
    console.log(color + " "  + font + " " + email);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}   

function abrir(){
    var $fieldSet = document.getElementById("fieldset");
    $fieldSet.hidden=false;
    
}

function cerrar(){
    var $fieldSet = document.getElementById("fieldset");
    $fieldSet.hidden=true; //probar add y remove attributes.
}

function interactGif(status){
    var spinner = document.getElementById("hiddenDiv");
    spinner.hidden = status;
}

function cargarPost()
{
    interactGif(false);
    cerrar();
    console.log("Enviando:");

    var title = document.getElementById("inputTitle").value;
    var header = document.getElementById("inputHeader").value;
    var textContent = document.getElementById("textArea").value;
    var email = getParameterByName("email", window.url);
    var string = '{title:'+title+'&'+'header:'+header+'&'+'posttext:'+textContent+'author:'+email+'}';
    var convertedString = JSON.stringify(string);

    //si pongo false va sincronico shilua!
    
    request.open("POST","http://192.168.2.233:1337/postearNuevaEntrada",true);
    request.onreadystatechange = callback;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(convertedString);

    
    
}

function callback(){
    if( request.readyState === 4){
    if(request.status === 200){
            var response = JSON.parse(request.responseText);
            interactGif(true);
        }
        else{
            console.log("Error en la respuesta del servidor.", request.status);
        }
    }
}