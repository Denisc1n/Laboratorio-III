var express =require("express");
var cors = require("cors");
var corsOptions = {origin:"*",optionSucessStatus:200};
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors(corsOptions));

//var personas=require('./MOCK_DATA.json');




app.get("/personas",function(req,res){
    
    res.send([{"nombre":"Chiquia","apellido":"Baptist","fecha":"1979/04/07","telefono":"4923023102"},
{"nombre":"Annissa","apellido":"Kleinlerer","fecha":"1987/11/18","telefono":"6793823280"},
{"nombre":"Reiko","apellido":"Muat","fecha":"1972/10/26","telefono":"1725850167"},
{"nombre":"Vernen","apellido":"MacConnel","fecha":"1983/11/16","telefono":"4497697435"},
{"nombre":"Frederica","apellido":"Boggers","fecha":"1975/10/17","telefono":"1141857691"},
{"nombre":"Roxy","apellido":"Edowes","fecha":"1978/01/12","telefono":"7225696366"},
{"nombre":"Lawton","apellido":"Dawdary","fecha":"1979/06/18","telefono":"1632952145"},
{"nombre":"Ki","apellido":"Beston","fecha":"1979/07/26","telefono":"8529878768"},
{"nombre":"Krysta","apellido":"Alkins","fecha":"1997/12/18","telefono":"7428838803"},
{"nombre":"Natalie","apellido":"Finnan","fecha":"1979/05/26","telefono":"5929493650"},
{"nombre":"Lusa","apellido":"Queyeiro","fecha":"1983/05/01","telefono":"6268154754"},
{"nombre":"Eleonore","apellido":"Ilsley","fecha":"1995/06/21","telefono":"6628991514"},
{"nombre":"Hyman","apellido":"Meeland","fecha":"1984/02/03","telefono":"8342834047"},
{"nombre":"Rheta","apellido":"Wickie","fecha":"1995/08/04","telefono":"8415132984"},
{"nombre":"Bev","apellido":"Sheehy","fecha":"2000/02/02","telefono":"4531348771"},
{"nombre":"Rafaellle","apellido":"Fillingham","fecha":"1974/01/19","telefono":"4467729807"},
{"nombre":"Rafi","apellido":"Pannaman","fecha":"1996/06/20","telefono":"5188812692"},
{"nombre":"Crysta","apellido":"Quested","fecha":"1997/08/03","telefono":"3221584406"},
{"nombre":"Gualterio","apellido":"Pre","fecha":"1995/01/01","telefono":"5259218434"},
{"nombre":"Ingaberg","apellido":"Rhoddie","fecha":"1999/03/05","telefono":"6736047298"},
{"nombre":"Julissa","apellido":"Gullivan","fecha":"1983/04/22","telefono":"6075124856"},
{"nombre":"Gretel","apellido":"Pontin","fecha":"1971/05/30","telefono":"7714909789"},
{"nombre":"Martita","apellido":"Poxton","fecha":"1990/03/07","telefono":"2787892206"},
{"nombre":"Paolo","apellido":"Jahnig","fecha":"1995/11/07","telefono":"8478105854"},
{"nombre":"Tris","apellido":"Gooms","fecha":"1985/12/03","telefono":"3043327532"},
{"nombre":"Dal","apellido":"Payle","fecha":"1986/04/30","telefono":"5571017804"},
{"nombre":"Abner","apellido":"Liddle","fecha":"1977/01/20","telefono":"5472993489"},
{"nombre":"Fidela","apellido":"Curman","fecha":"1997/04/28","telefono":"9473648555"},
{"nombre":"Bink","apellido":"Luckett","fecha":"1982/07/12","telefono":"1171943956"},
{"nombre":"Hewe","apellido":"Holdworth","fecha":"1992/09/13","telefono":"2808229002"},
{"nombre":"Padgett","apellido":"Rubertelli","fecha":"1988/03/16","telefono":"4383001760"},
{"nombre":"Gerrie","apellido":"Dockwray","fecha":"1990/12/03","telefono":"8794285377"},
{"nombre":"Cristian","apellido":"Gaudon","fecha":"1989/10/22","telefono":"3603194211"},
{"nombre":"Brooke","apellido":"Gyurkovics","fecha":"1999/06/18","telefono":"9076710328"},
{"nombre":"Clayton","apellido":"Klagge","fecha":"1985/12/14","telefono":"5777413777"},
{"nombre":"Laird","apellido":"McCauley","fecha":"1981/07/17","telefono":"8841425134"},
{"nombre":"Cory","apellido":"Dunthorn","fecha":"1972/09/19","telefono":"4182392935"},
{"nombre":"Evangelina","apellido":"Preon","fecha":"1987/09/24","telefono":"7715261955"}]);

});


app.post("/nuevaPersona",function(req,res){
    setTimeout(function(){
        console.log("Llego al servidor "+JSON.stringify(req.body));
        console.log((req.body.nombre!= undefined &&req.body.nombre!= "") );
       
        if((req.body.nombre!= undefined&&req.body.nombre!= "") &&(req.body.apellido!= undefined&&req.body.nombre!= "") &&  (req.body.telefono!= undefined&&req.body.telefono!= "") && (req.body.fecha!= undefined&&req.body.fecha!= "")){
            
                console.log("Sale del servidor "+"{'respuesta': 'ok'}");
                personas.push(req.body);

                res.send({'respuesta': 'ok'});    
            
            return;
        }
        console.log("Sale del servidor "+"{'respuesta': 'error'}")
        res.send({'respuesta': 'error'});
    },2000);
    
});



app.listen(3000,function(){
    console.log("Api en el puerto 3000");
});