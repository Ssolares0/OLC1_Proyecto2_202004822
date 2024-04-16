
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');


class Return extends instruccion{
    constructor(exp,fila,columna){
        super(TipoInstruccion.RETURN,fila,columna);
        this.exp = exp;
    }

    interpretar(entorno){

        let value = this.exp.interpretar(entorno);
        if(this.exp.tipo == TipoDato.ERROR){
            console.log("Error semantico: no se pueden retornar errores");
            return "Error semantico: no se pueden retornar errores, linea: "+this.fila+" columna: "+this.columna;
        }
        
        return value;
    }

    getNodo(){
        let nodo = new NodoAst("RETURN");
        nodo.agregarHijo("return");
        nodo.agregarHijoAST(this.exp.getNodo());
        nodo.agregarHijo(";");

       
        return nodo;
    }
}
module.exports = Return;