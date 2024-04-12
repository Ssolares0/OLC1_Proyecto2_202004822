const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');

class Funciones extends instruccion{
    constructor(id,parametros, instr,fila,columna){
        super(fila,columna);
        this.id = id;
        this.parametros = parametros;
        this.instr = instr;
    }

    interpretar(entorno){
        
        
    }
    getNodo(){
        let nodo = new NodoAst("FUNCION");
        nodo.agregarHijo("function");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            nodo.agregarHijoAST(instruccion.getNodo());
        });
        nodo.agregarHijo("}");
        return nodo;
    }
}
module.exports = Funciones;