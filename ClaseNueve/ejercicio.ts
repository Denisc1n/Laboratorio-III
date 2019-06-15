    let listaDeAnimales:Array<animal.Animal> = new Array<animal.Animal>();

    listaDeAnimales.push( new animal.Perro("Perricola"));
    listaDeAnimales.push( new animal.Gato("Michi"));
    
    $(function(){
        $("elBotonDeListar").click( cargarLista );
    });
    
    function cargarLista(){
    
        var tbodyObject = $("#tableBody");
        console.log(tbodyObject);
        var animalLeido;
        listaDeAnimales.forEach(ani => {
            if(ani instanceof animal.Gato){
                    animalLeido =  (ani as animal.Gato);
            }
            else{
                animalLeido = ani as animal.Perro;
            }
           
            var elementoTr = document.createElement('tr');
            tbodyObject.append(elementoTr);
            //elementoTr.appendChild(generateTd();
            //elementoTr.appendChild(generateTd((Gato)ani.especie));
        });
    }

    function generateTd (data:string){
    
        var elementoTd = document.createElement('td');
        var elementoText = document.createTextNode(data);
        elementoTd.appendChild( elementoText );
        return elementoTd;
    }


