
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');


class Breaks extends instruccion {
    constructor(fila, columna) {
        super(TipoInstruccion.BREAK, fila, columna);
        this.fila = fila;
        this.columna = columna;

    }

    interpretar(entorno) {
        return '';
    }

    getNodo() {
        let nodo = new NodoAst("BREAK");
        nodo.agregarHijo("break");
        nodo.agregarHijo(";");
        return nodo;
    }
}

module.exports = Breaks;