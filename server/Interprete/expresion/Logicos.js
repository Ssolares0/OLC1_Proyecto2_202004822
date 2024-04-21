const e = require('express');
const instruccion = require('../instruccion.js');
const {Expresion,TipoDato} = require('../Expresion.js');
const { NodoAst } = require('../graficar/NodoAst.js');


class Logicos extends Expresion {

    constructor(op1, op2, logico, linea, columna) {
        super("ERROR", TipoDato.ERROR,linea, columna);
        this.op1 = op1;
        this.op2 = op2;
        this.logico = logico;
        
    }
    interpretar(entorno) {
        const op1 = this.op1.interpretar(entorno);
        const op2 = this.op2.interpretar(entorno);

        if (this.op1.tipo != TipoDato.BOOL && this.op2.tipo != TipoDato.BOOL) {
            //Errores semanticos
            this.tipo = TipoDato.ERROR;
            console.log("Existe un Error semantico de tipo de dato");
            return this.valor;
        }
        switch (this.logico) {
            case "&&":
                this.tipo = TipoDato.BOOL;
                this.valor = op1 && op2;
                return this.valor;

            case "||":
                this.tipo = TipoDato.BOOL;
                this.valor = op1 || op2;
                return this.valor;

            case "!":
                this.tipo= TipoDato.BOOL;
                this.valor = !op1;
                return this.valor;

        }
    }

    getNodo() {
        let nodo = new NodoAst("Logicos");
        nodo.agregarHijoAST(this.op1.getNodo());
        nodo.agregarHijo(this.logico);

        nodo.agregarHijoAST(this.op2.getNodo());
        return nodo;
    }
}


module.exports = Logicos;