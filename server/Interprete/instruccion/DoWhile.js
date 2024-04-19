const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');



class DoWhile extends instruccion{
    constructor(condicion,instr,fila,columna){
        super(TipoInstruccion.WHILE,fila,columna);
        this.condicion = condicion;
        this.instr = instr;
    }
    interpretar(entorno){

    }
}
module.exports.DoWhile = DoWhile;