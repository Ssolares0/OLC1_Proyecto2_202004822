
const { NodoAst } = require('../graficar/NodoAst.js');
;
const { Expresion, TipoDato } = require('../Expresion.js');



class ToString extends Expresion{
    constructor( expresion,fila, columna){
        super("ERROR",TipoDato.ERROR,fila, columna);
        
        this.expresion = expresion;
        
        
    }
    interpretar(entorno){
        const exp = this.expresion.interpretar(entorno);
        console.log("expresion a convertir a string: ",exp);
        

        if(this.expresion.tipo == TipoDato.BOOL ){
            this.tipo = TipoDato.CADENA;
            return exp.toString();
        }else if(this.expresion.tipo == TipoDato.ENTERO || this.expresion.tipo == TipoDato.DECIMAL ){
            this.tipo = TipoDato.CADENA;
            return exp.toString();
        }else{
            this.tipo = TipoDato.ERROR;
            console.log("Existe un Error semantico de tipo de dato");
            
            return this.valor;
        }
        
       
        
    }
    getNodo(){
        var nodo = new NodoAst("TO_STRING");
        nodo.agregarHijo("toString");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
        
        
    }
}
module.exports = ToString;