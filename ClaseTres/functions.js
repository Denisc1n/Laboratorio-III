window.onload = loadEvents;

function loadEvents()
{
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

function saveFunction(){
    var $name = document.getElementById("inputName");
    var $surname = document.getElementById("inputSurname");

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
            tbodyObject.innerHTML +="<tr><td>"+$name.value+"</td><td>" + 
                $surname.value+"</td><td>"+"<a href='#'>Borrar</a>"+"</td></tr>"

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


    