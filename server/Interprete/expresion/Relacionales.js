const e = require('express');
const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');


class Relacionales extends instruccion {
    constructor(op1, op2, operador, linea, columna) {
        super();
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.tipo = 'ERROR';
        this.valor = 'null';
        this.linea = linea;
        this.columna = columna;
    }

    interpretar(entorno) {
        const op1 = this.op1.interpretar(entorno);
        const op2 = this.op2.interpretar(entorno);

        if (this.op1.tipo == "ENTERO" && this.op2.tipo == "ENTERO"
            || this.op1.tipo == "ENTERO" && this.op2.tipo == "DECIMAL"
            || this.op1.tipo == "DECIMAL" && this.op2.tipo == "ENTERO"
            || this.op1.tipo == "DECIMAL" && this.op2.tipo == "DECIMAL"
            || this.op1.tipo == "ENTERO" && this.op2.tipo == "CHAR"
            || this.op1.tipo == "CHAR" && this.op2.tipo == "ENTERO"
            || this.op1.tipo == "ENTERO" && this.op2.tipo == "CHAR"
            || this.op1.tipo == "CHAR" && this.op2.tipo == "CHAR"
            || this.op1.tipo == "BOOL" && this.op2.tipo == "BOOL"
            || this.op1.tipo == "CADENA" && this.op2.tipo == "CADENA"
            || this.op1.tipo == "DECIMAL" && this.op2.tipo == "CHAR"
            || this.op1.tipo == "CHAR" && this.op2.tipo == "DECIMAL") {

            switch (this.operador) {
                case "==":
                    this.tipo = "BOOL";
                    this.valor = op1 == op2;
                    return this.valor;
                case "!=":
                    this.tipo = "BOOL";
                    this.valor = op1 != op2;
                    return this.valor;
                case ">":
                    this.tipo = "BOOL";
                    this.valor = op1 > op2;
                    return this.valor;;
                case "<":
                    this.tipo = "BOOL";
                    this.valor = op1 < op2;
                    return this.valor;
                case ">=":
                    this.tipo = "BOOL";
                    this.valor = op1 >= op2;
                    return this.valor;
                case "<=":
                    this.tipo = "BOOL";
                    this.valor = op1 <= op2;
                    return this.valor;
            }
        }
    }
    //creamos el nodo del arbol
    getNodo() {
        let nodo = new NodoAst("Relacional");
        nodo.agregarHijoAST(this.op1.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoAST(this.op2.getNodo());
        return nodo;
    }
}

module.exports = Relacionales;