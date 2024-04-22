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
            
            return "Existe un Error semantico, la variable no ha sido declarada";   
        }
           
            entorno.actualizar_variable(this.id, value);

            
            return "Se actualizo la variable: " + this.id + " con valor: " + value;
            
        
        
        

    }
    getNodo(){
        
        let nodo = new NodoAst("ASIGNACION");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("=");
        nodo.agregarHijoAST(this.expresion.getNodo());
        return nodo;
    }
}
module.exports = Asignacion;