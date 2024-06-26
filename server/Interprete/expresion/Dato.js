const instruccion = require('../instruccion.js');
const {NodoAst} = require('../graficar/NodoAst.js');
const {Expresion,TipoDato} = require('../Expresion.js');


class Dato extends Expresion {
    constructor(valor, tipo,fila,columna) {
        super(valor,tipo,fila,columna);
        this.valor = valor;
        this.tipo = tipo;

    }

    getNodo() {
        let nodo = new NodoAst("Dato");
        nodo.agregarHijo(this.valor);
        return nodo;
    }
    interpretar(entorno) {
        switch (this.tipo) {
            case "ENTERO":
                return Number(this.valor);
            case "CADENA":
                var cadenaSincomillas = this.valor.slice(1, -1);
                return cadenaSincomillas;
            case "DECIMAL":
                return (this.valor);
            case "BOOL":
                return this.valor;
            case 'CHAR':
                return this.valor;
            
        }
    }
}

module.exports = Dato;