namespace animal{

    export class Gato implements Animal{

        nombreGato:string = "";
            constructor(nombre:string){
                this.nombreGato = nombre;
        }
        hacerRuido(): string {
           return "MIAU.";
        }
    }
}