var xml = new XMLHttpRequest(); 
window.addEventListener("load",function() {
    loadTable();
})

function loadTable() {
    xml.open("GET", "http://192.168.0.7:3000/personas", true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xml.onreadystatechange = callback;
    xml.send();
}

function callback() {
    var table = document.getElementById("tCuerpo");
    //console.log("Llego respuesta del servidor",xml.readyState,xml.status);
    if (xml.readyState === 4) {
        if (xml.status === 200) {
            var personas = JSON.parse(xml.responseText);
            console.log(personas);
            personas.forEach(persona => {
                table.innerHTML += "<tr><td>"+persona.nombre+"</td>"+"<td>"+persona.apellido+"</td>"+"<td>"+persona.fecha+"</td>"+"<td>"+persona.telefono+"</td></tr>";
            });
        }
        else{
            console.log("Error en la respuesta del servidor Numero: "+xml.status);
        }
    }
}