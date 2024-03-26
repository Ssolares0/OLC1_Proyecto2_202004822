const instruccion = require('../instruccion.js');
const {NodoAst} = require('../graficar/NodoAst.js');

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
        return value;
        
    }   
    getNodo(){
        let nodo = new NodoAst("PRINT");
        nodo.agregarHijo("println");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }
}

module.exports = Print;