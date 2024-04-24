
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');


class Return extends instruccion{
    constructor(exp,fila,columna){
        super(fila,columna);
        this.exp = exp;
        
    }

    interpretar(entorno){
        let entornoRETURN = new Entorno(TipoInstruccion.RETURN, entorno);
        if (this.exp == null) {
            return '';
        }
        let value = this.exp.interpretar(entornoRETURN);

        console.log("RETURN: " + this.exp.tipo);
        
        
        

        
        return value;
        
        
        

    }

    getNodo(){
        let nodo = new NodoAst("RETURN");
        nodo.agregarHijo("return");
        //nodo.agregarHijoAST(this.exp.getNodo());
        nodo.agregarHijo(";");

       
        return nodo;
    }
}
module.exports = Return;