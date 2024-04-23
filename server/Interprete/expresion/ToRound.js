const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { Entorno } = require('../symbols/entorno.js');
const { Expresion, TipoDato } = require('../Expresion.js');
const Error = require('../errores/error.js');


class ToRound extends Expresion{
    constructor( expresion,fila, columna){
        super("ERROR",TipoDato.ERROR,fila, columna);
        
        this.expresion = expresion;
        
        
    }
    interpretar(entorno){
        const exp = this.expresion.interpretar(entorno);
        

        if(this.expresion.tipo == TipoDato.ENTERO ){
            this.tipo = TipoDato.ENTERO;
            return Math.round(exp);
        }else if(this.expresion.tipo == TipoDato.DECIMAL){
            this.tipo = TipoDato.DECIMAL;
            return Math.round(exp);
        }else{
            this.tipo = TipoDato.ERROR;
            console.log("Existe un Error semantico de tipo de dato");
            
            return this.valor;
        }
        
       
        
    }
    getNodo(){
        let nodo = new NodoAst("ROUND");
        nodo.agregarHijo("ROUND");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
        
    }
}
module.exports = ToRound;