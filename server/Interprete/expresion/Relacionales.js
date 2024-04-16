const e = require('express');
const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const {Expresion,TipoDato} = require('../Expresion.js');

class Relacionales extends Expresion {
    constructor(op1, op2, operador, linea, columna) {
        super("ERROR",TipoDato.ERROR,linea, columna);
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        
    }

    interpretar(entorno) {
        let op1 = this.op1.interpretar(entorno);
        let op2 = this.op2.interpretar(entorno);
        

        if (this.op1.tipo == TipoDato.ENTERO && this.op2.tipo == TipoDato.ENTERO
            || this.op1.tipo == TipoDato.ENTERO && this.op2.tipo == TipoDato.DECIMAL
            || this.op1.tipo == TipoDato.DECIMAL && this.op2.tipo == TipoDato.ENTERO
            || this.op1.tipo == TipoDato.DECIMAL && this.op2.tipo == TipoDato.DECIMAL
            || this.op1.tipo == TipoDato.ENTERO && this.op2.tipo == TipoDato.CHAR
            || this.op1.tipo == TipoDato.CHAR && this.op2.tipo == TipoDato.ENTERO
            || this.op1.tipo == TipoDato.ENTERO && this.op2.tipo == TipoDato.CHAR
            || this.op1.tipo == TipoDato.CHAR && this.op2.tipo == TipoDato.CHAR
            || this.op1.tipo == TipoDato.BOOL && this.op2.tipo == TipoDato.BOOL
            || this.op1.tipo == TipoDato.CADENA && this.op2.tipo == TipoDato.CADENA
            || this.op1.tipo == TipoDato.DECIMAL && this.op2.tipo == TipoDato.CHAR
            || this.op1.tipo == TipoDato.CHAR && this.op2.tipo == TipoDato.DECIMAL) {

            switch (this.operador) {
                case "==":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 == op2;
                    return this.valor;
                case "!=":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 != op2;
                    return this.valor;
                case ">":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 > op2;
                    return this.valor;
                case "<":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 < op2;
                    return this.valor;
                case ">=":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 >= op2;
                    return this.valor;
                case "<=":
                    this.tipo = TipoDato.BOOL;
                    this.valor = op1 <= op2;
                    return this.valor;
            }
        }
    }
    //creamos el nodo del arbol
    getNodo() {
        let nodo = new NodoAst("Relacional");
        console.log(this.op1.getNodo());
        nodo.agregarHijoAST(this.op1.getNodo());

    
        
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoAST(this.op2.getNodo());
        return nodo;
    }
}

module.exports = Relacionales;