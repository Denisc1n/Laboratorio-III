window.onload = loadEvents;

var request = new XMLHttpRequest();
function loadEvents(){
    //es lo mismo que hacer .onclick, pero me permite suscribirme a diferentes eventos)
  get("sendButton").addEventListener("click", functionLogin)
}

function functionLogin(){
    console.log("Enviando:");

    var usuario = get("userInput").value;
    var password = get("passInput").value;
    var salida = JSON.stringify('{"email":'+usuario+',"password":'+password+'}');

    //si pongo false va sincronico shilua!
    
    request.open("POST","ipservidor",true);
    request.onreadystatechange = callback;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(salida);

}

function callback(){
    //console.log("Respuesta del servidor. " + request.readyState , 'Codigo: ' + request.status );
    
    if( request.readyState === 4){
    if(request.status === 200){
            var response = JSON.parse(request.responseText);
            if( response.autenticado == 'si'){
                console.log(response);
                //window.location.replace("index.html?email="+document.getElementById("userInput").value+"&"+"color="+response.preferencias.color+"&font="+response.preferencias.font);
                window.location.href = "index.html?email="+get("userInput").value+"&"+"color="+response.preferencias.color+"&font="+response.preferencias.font;
            }
        }
        else{
            console.log("Error en la respuesta del servidor.", request.status);
        }
    }
}



function get(id) {
    var retorno = document.getElementById(id);
    return retorno;
}