//var request = new XMLHttpRequest();
//request.open("GET","http://192.168.2.220:3000/login",true);
//request.send();



window.onload = carga;
var request = new XMLHttpRequest();
function carga(){
    //es lo mismo que hacer .onclick, pero me permite suscribirme a diferentes eventos)
  document.getElementById("sendButton").addEventListener("click", functionLogin)
}

function functionLogin(){
    console.log("Enviando:");

    var usuario = document.getElementById("userInput").value;
    var password = document.getElementById("passInput").value;
    var enviar = 'usr='+usuario+'&'+'pass='+password;
    request.open("POST","http://192.168.2.220:3000/loginUsuario",true);
    request.onreadystatechange = callback;
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.send(enviar);

}

function callback(){
    //console.log("Respuesta del servidor. " + request.readyState , 'Codigo: ' + request.status );
    
    if( request.readyState === 4){
    if(request.status === 200){
            console.log("Respuesta del servidor correcta. Codigo: ", request.readyState, request.status, 
                request.responseText);
            if( request.responseText === "true"){
                alert("Bienvenido");
                document.write("UOLA");
            }
                
            else{
                alert("Error de Credenciales");
            }
        }
        else{
            console.log("Error en la respuesta del servidor.", request.status);
        }
    }
}

