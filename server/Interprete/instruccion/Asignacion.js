const { instruccion, TipoInstruccion } = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
//const Entorno = require('../symbols/entorno.js');
const { TipoSimbolo } = require('../symbols/Symbol.js');
const { TipoDato } = require('../Expresion.js');


class Asignacion extends instruccion {

    constructor(id, expresion, line, column) {
        super( line, column);
        this.expresion = expresion;
        this.id = id;
        this.line = line;
        this.column = column;
    }

    interpretar(entorno) {
        let value = this.expresion.interpretar(entorno);
        var variable = entorno.get_variable(this.id);
        if (variable == null || variable == undefined) {
            //Errores semanticos
            this.tipo == TipoDato.ERROR;
            console.log("Existe un Error semantico, la variable no ha sido declarada");
            return this.valor;
        }else{
            let c = entorno.actualizar_variable(this.id, value);
            if (!c) {
                console.log("Error semantico: la variable " + this.id + " no ha sido declarada");
                return;
            }
        }
        return "";

    }
}
module.exports = Asignacion;