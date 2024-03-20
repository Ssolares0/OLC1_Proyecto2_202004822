const instruccion = require('../instruccion.js');


class Print extends instruccion{
    constructor(expresion){
        super();
        this.expresion = expresion;
    }

    interpretar(entorno){
        let value =this.expresion.interpretar(null);
        if(this.expresion.tipo == "ERROR"){
            console.log("Error semantico: no se pueden imprimir errores");
            return;
        }
        console.log(value);
    }   
}

module.exports = Print;