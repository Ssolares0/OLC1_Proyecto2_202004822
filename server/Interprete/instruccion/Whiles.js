
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');



class Whiles extends instruccion{
    constructor(condicion,instr,fila,columna){
        super(TipoInstruccion.WHILE,fila,columna);
        this.condicion = condicion;
        this.instr = instr;
    }

    interpretar(entorno){
        let entornoWhile = new Entorno(TipoInstruccion.WHILE,entorno);
        let cond = this.condicion.interpretar(entornoWhile);
        let value ="";
        if(this.condicion.tipo != 'BOOL'){
            console.log('Error semantico: la condicion no es booleana');
            return this;
        }
        while(String(this.condicion.valor).toLowerCase() === "true"){
            this.instr.forEach(instruccion => {
                value +=this.instr.interpretar(entornoWhile);
                value += "\n";
            });
            let cond = this.condicion.interpretar(entornoWhile);
            if(this.condicion.tipo != 'BOOL'){
                console.log('Error semantico: la condicion no es booleana');
                return this;
            }

            return value;
        }
        return this;

    }
    getNodo(){
        let nodo = new NodoAst("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            nodo.agregarHijoAST(instruccion.getNodo());
        });
        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = Whiles;