$(document).ready(function(){
    $("#btn").click(function(){
        $.get("http://localhost:3000/materias",/*,Aca van los params*/ function(data,status){
            alert("Data:" + data + "\n" + "Status:" + status);
            console.log(data);
        })
    });

    $("#btnPost").click(function(){
        $.post("http://localhost:3000/nueva",
        {
            id:25,
            nombre:"Materia",
            turno:"noche",
            fechaFinal:'13/09/2019',
            cuatrimestre:2
        },
        function(data, status){
            /*Mi Callback*/
        })
    });
})