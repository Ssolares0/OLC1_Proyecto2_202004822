
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
        
        if (this.exp == null) {
            return '';
        }
        let value = this.exp.interpretar(entorno);
        
        
        

        
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