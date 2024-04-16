
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');


class Continues extends instruccion {
    constructor(fila, columna) {
        super(TipoInstruccion.CONTINUE, fila, columna);
        this.fila = fila;
        this.columna = columna;

    }

    interpretar(entorno) {
        return '';
    }

    getNodo() {
        let nodo = new NodoAst("CONTINUE");
        nodo.agregarHijo("continue");
        nodo.agregarHijo(";");
        return nodo;
    }
}

module.exports = Continues;