const { instruccion, TipoInstruccion } = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
//const Entorno = require('../symbols/entorno.js');
const { TipoSimbolo } = require('../symbols/Symbol.js');
const { TipoDato } = require('../Expresion.js');



class Casteo extends instruccion {
    constructor(expresion, tipo,line, column) {
        super( line, column);
        this.expresion = expresion;
        this.tipo = tipo;
        this.line = line;   
        this.column = column;
    }
    interpretar(entorno) {
        let tipo = this.tipo;
        if (this.expresion =!null) {
            let value = this.expresion.interpretar(entorno);
            console.log(this.expresion)
        }
    }
}

module.exports = Casteo;