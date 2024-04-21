const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { Entorno } = require('../symbols/entorno.js');
const { Expresion, TipoDato } = require('../Expresion.js');
const Error = require('../errores/error.js');


class ToLower extends Expresion{
    constructor(nombre, expresion,fila, columna){
        super(fila, columna);
        this.nombre = nombre;
        this.expresion = expresion;
        
    }
    interpretar(entorno){
        const exp = this.expresion.interpretar(entorno);

        if (this.nombre.toLowerCase() == "tolower"){
            if(this.expresion.tipo == TipoDato.CADENA){
                return exp.toLowerCase();
            }else{
                return("Error Semantico", `No se puede convertir a minusculas el tipo ${this.expresion.tipo}`, this.fila, this.columna);
            }
            
        }else{
            if (this.expresion.tipo == TipoDato.CADENA){
                
                return exp.toUpperCase();
                
            }else{
                console.log("Error Semantico", `No se puede convertir a mayusculas el tipo ${this.expresion.tipo}`, this.fila, this.columna)
                return("Error Semantico", `No se puede convertir a mayusculas el tipo ${this.expresion.tipo}`, this.fila, this.columna);

            }
            
        }
    }
    getNodo(){
        let nodo = new NodoAst("TOLOWER/TOUPPER");
        nodo.agregarHijo(this.nombre);
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}
module.exports = ToLower;