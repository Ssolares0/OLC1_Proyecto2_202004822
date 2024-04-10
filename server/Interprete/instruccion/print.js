const {instruccion,TipoInstruccion}= require('../instruccion.js');
const {NodoAst} = require('../graficar/NodoAst.js');
const {TipoDato } = require('../Expresion.js');

class Print extends instruccion{
    constructor(expresion,fila,columna){
        super(TipoInstruccion.PRINT,fila,columna);
        this.expresion = expresion;
    }

    interpretar(entorno){
        let value =this.expresion.interpretar(entorno);
        if(this.expresion.tipo == TipoDato.ERROR){
            console.log("Error semantico: no se pueden imprimir errores");
            return "Error semantico: no se pueden imprimir errores";
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