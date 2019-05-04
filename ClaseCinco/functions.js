window.onload = loadEvents;
var xml = new XMLHttpRequest(); 


function loadTable() {
    xml.open("GET", "http://localhost:3000/personas", true);
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
            var tbodyObject = document.getElementById("tableBody");
            
            personas.forEach(persona => {
                var elementoTr = document.createElement('tr');
                tbodyObject.appendChild(elementoTr);
                elementoTr.appendChild(generateTd(persona.nombre));
                elementoTr.appendChild(generateTd(persona.apellido));
                elementoTr.appendChild(generateTd(persona.fecha));
                elementoTr.appendChild(generateTd(persona.telefono));
                elementoTr.appendChild(generateTd(tbodyObject.childElementCount));
                //table.innerHTML += "<tr><td>"+persona.nombre+"</td>"+"<td>"+persona.apellido+"</td>"+"<td>"+persona.fecha+"</td>"+"<td>"+persona.telefono+"</td></tr>";
            });
            localStorage.setItem('cachedData', JSON.stringify(personas));
        }
        else{
            console.log("Error en la respuesta del servidor Numero: "+xml.status);
        }
    }
}

function loadTableFromCache(){
    var personas = JSON.parse(localStorage.getItem('cachedData'));
    var tbodyObject = document.getElementById("tableBody");
            
    personas.forEach(persona => {
        var elementoTr = document.createElement('tr');
        tbodyObject.appendChild(elementoTr);
        elementoTr.appendChild(generateTd(persona.nombre));
        elementoTr.appendChild(generateTd(persona.apellido));
        elementoTr.appendChild(generateTd(persona.fecha));
        elementoTr.appendChild(generateTd(persona.telefono));
        elementoTr.appendChild(generateTd(tbodyObject.childElementCount));
        //table.innerHTML += "<tr><td>"+persona.nombre+"</td>"+"<td>"+persona.apellido+"</td>"+"<td>"+persona.fecha+"</td>"+"<td>"+persona.telefono+"</td></tr>";
    });

}

function loadEvents()
{
    if(localStorage.getItem('cachedData') == null)
        loadTable();

    else{
        loadTableFromCache();
    }
    document.getElementById("saveButton").addEventListener("click", saveFunction);
    document.getElementById("addButton").addEventListener("click",abrir);
    document.getElementById("buttonClose").addEventListener("click",cerrar);

}

function abrir(){
    var $fieldSet = document.getElementById("fieldset");
    var $button = document.getElementById("addButton");
    $fieldSet.hidden=false;
    $button.hidden = true;
}

function cerrar(){
    var $fieldSet = document.getElementById("fieldset");
    var $button = document.getElementById("addButton");
    $fieldSet.hidden=true; //probar add y remove attributes.
    $button.hidden = false;
}

function generateTd (data){

    var elementoTd = document.createElement('td');
    if(!Number.isInteger(data)){
    var elementoText = document.createTextNode(data);
    elementoTd.appendChild( elementoText );
    
    }
    else{
        elementoTd.setAttribute('class','actions');
        var elementoA = document.createElement('a');
        elementoA.text= "Borrar";
        elementoA.id = "deleteButton_"+data;
        elementoA.addEventListener('click', deleteFunction );
        elementoA.setAttribute('href','#');
        elementoTd.appendChild( elementoA );

        elementoTd.appendChild(document.createTextNode(" "));

        var elementoAMod = document.createElement('a');
        elementoAMod.text= "Modificar";
        elementoAMod.id = "modifyButton_"+data;
        elementoAMod.addEventListener('click', modifyFunction );
        elementoAMod.setAttribute('href','#');
        elementoTd.appendChild( elementoAMod );
    }
    return elementoTd;
}

function saveFunction(){
    var $name = document.getElementById("inputName");
    var $surname = document.getElementById("inputSurname");
    var $dob = document.getElementById("inputDob");
    var $phone = document.getElementById("inputPhone");  

    if( ($name.value=="" || $surname.value =="") )
    {
        if($name.value==""){    
            document.getElementById("inputName").className = "error";
        }

        if($surname.value==""){
            document.getElementById("inputSurname").className = "error";
        }

        alert("Error. Ingrese nombre y apellido.");
        return;
    }
    
    
    var resultado = confirm("¿Esta seguro que desea guardar un nuevo elemento?");
    if(resultado){
        var tbodyObject = document.getElementById("tableBody");
        var elementoTr = document.createElement('tr');
        tbodyObject.appendChild(elementoTr);

        //var elementoTd = document.createElement('td');
        elementoTr.appendChild(generateTd($name.value));
        //var elementoText = document.createTextNode($name.value);
        //elementoTd.appendChild( elementoText );
        elementoTr.appendChild(generateTd($surname.value));
        elementoTr.appendChild(generateTd($dob.value));
        elementoTr.appendChild(generateTd($phone.value));

        elementoTr.appendChild(generateTd(tbodyObject.childElementCount));
       // var elementoA = document.createElement('a');
       // elementoA.text= "Borrar";
       // elementoA.id = "deleteButton_"+$name.value;
       // elementoA.href = "#";
       // elementoTd.appendChild( elementoA );

        document.getElementById("inputName").className= "inputOk";
        document.getElementById("inputSurname").className= "inputOk";
        setTimeout( function(){
            document.getElementById("inputName").value= "";
            document.getElementById("inputSurname").value= "";
            document.getElementById("inputName").className= "";
            document.getElementById("inputSurname").className= "";
        },100)
        return;
    }
    
}

function deleteFunction(e){
    e.preventDefault();
    //console.log(e.target.parentNode.parentNode);
    //console.log(e.srcElement.parentNode.parentNode);
    var trToDelete = e.srcElement.parentNode.parentNode;
    trToDelete.parentNode.removeChild( trToDelete );
}

function modifyFunction(e){
    e.preventDefault();
    var fieldset = document.getElementById('fieldset');
    console.log(fieldset.children);
}




    