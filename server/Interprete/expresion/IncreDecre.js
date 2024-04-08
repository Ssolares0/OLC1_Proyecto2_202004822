const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { Entorno } = require('../symbols/entorno.js');
const { Expresion, TipoDato } = require('../Expresion.js');

class IncreDecre extends Expresion {

    constructor(id, tipo, linea, columna) {
        super("ERROR", TipoDato.ERROR, linea, columna);
        this.id = id;
        this.tipo = tipo;
    }
    interpretar(entorno) {
        let valor = entorno.get_variable(this.id);

        let value = valor.valorr;
        let type = valor.tipoo;

        if (value == null) {
            console.log("No se encuentra la variable " + this.id);
            this.tipo = "ERROR";
            return null;
        }else if (type != TipoDato.ENTERO) {
            console.log("Error semantico: la variable no es de tipo ENTERO");
            return null;
        }
        switch (this.tipo) {
            case '++':
                value++;
                break;
            case '--':
                value--;
                break;
            default:
                break;
        }
        let actualizado = entorno.actualizar_variable(this.id, value);
        return "";
    }
    getNodo() {
        let nodo = new NodoAst("INCREMENTO/DECREMENTO");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.tipo);
        return nodo;
    }
}
module.exports = IncreDecre;