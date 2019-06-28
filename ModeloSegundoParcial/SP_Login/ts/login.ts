let arrayDeObjetos: any[];

$(function(){
    cargarArrayDeObjetos();
    $('#btn-enviar').click(recuperarEmailYContrasena);
});

// Cuando se termine de cargar la página (onload), crear un array de 5 objetos JSON (correo, clave, nombre, apellido, legajo, perfil y foto).
// Guardarlo en el LocalStorage y mostrar los elementos por consola. Si ya existe el array en el LocalStorage, no sobre escribirlo. Informar por consola su previa
// existencia.
function cargarArrayDeObjetos(){
    arrayDeObjetos = [
        {"correo" : "juan@gmail.com", "clave" : "cjuan", "nombre" : "Juan", "apellido" : "Garcia", "legajo" : "1", "perfil" : "" , "foto" : ""},
        {"correo" : "maria@gmail.com", "clave" : "cMaria", "nombre" : "Maria", "apellido" : "Benitez", "legajo" : "2", "perfil" : "" , "foto" : ""},
        {"correo" : "raul@gmail.com", "clave" : "cRaul", "nombre" : "Raul", "apellido" : "Gomez", "legajo" : "3", "perfil" : "" , "foto" : ""},
        {"correo" : "rosa@gmail.com", "clave" : "cRosa", "nombre" : "Rosa", "apellido" : "Perez", "legajo" : "4", "perfil" : "" , "foto" : ""},
        {"correo" : "mauro@gmail.com", "clave" : "cMauro", "nombre" : "Mauro", "apellido" : "Estevez", "legajo" : "5", "perfil" : "" , "foto" : ""}
    ];
    (localStorage.length > 0) ? console.log('EL localStorage no esta vacio') : arrayDeObjetos.forEach(element => {
        localStorage.setItem(element.legajo, JSON.stringify(element))
        console.log(element);
    });  
}

// Asociar el evento click del botón btnEnviar a una función que recupere el e-mail y contraseña y verifique en el array de JSON, si el usuario está registrado o no. Si lo está, se redireccionará hacia principal.html. Caso contrario, se informará (por medio de un alert de BOOTSRAP - warning) de lo acontecido.
function recuperarEmailYContrasena(){
    let email = String($('#email').val()),
        pass = String($('#pass').val());

    (validarEmail(email) && validarClave(pass)) ? buscarEnArray(email, pass) : console.log('Error'); 
}

function validarEmail(email:string){ 
    let regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);
    if(email === "" || email.length > 100 || !regMail.test(email)){
        return false;
    }
    return true;
}

function validarClave(pass:string):boolean{
    if(pass.length > 8 || pass.length < 4) 
        return true;
    return false;
}   

function buscarEnArray(correo:string, pass:string){
    
}