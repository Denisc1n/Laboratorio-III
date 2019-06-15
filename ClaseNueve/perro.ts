namespace animal{
    
    export class Perro implements Animal{

        nombrePerro:string = "";

        constructor(nombre:string){
            this.nombrePerro = nombre;
        }

        hacerRuido(): string {
           return "Guau.";
        }
    }
}