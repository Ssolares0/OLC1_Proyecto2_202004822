const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { Entorno } = require('../symbols/entorno.js');
const { Expresion, TipoDato } = require('../Expresion.js');


class Ternario extends Expresion {
    constructor(condicion,exp1,exp2,fila,columna){
        super("ERROR",TipoDato.ERROR,fila,columna);
        this.condicion = condicion;
        this.exp1 = exp1;
        this.exp2 = exp2;
    }

    interpretar(entorno){
        let cond = this.condicion.interpretar(entorno);
        console.log("condicion: "+cond);
      
       
        if(this.condicion.tipo != TipoDato.BOOL){
            console.log("Error semantico: la condicion no es booleana");
            return "Error semantico: la condicion no es booleana, linea: "+this.fila+" columna: "+this.columna;

        }if(cond){
            
            this.tipo = this.exp1.tipo;
            let value= this.exp1.interpretar(entorno);
           
            return value
        }else{
            this.tipo = this.exp2.tipo;
            let value = this.exp2.interpretar(entorno);
            return value;
        }
    }

    getNodo(){
        let nodo = new NodoAst("TERNARIO");
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo("?");
        nodo.agregarHijoAST(this.exp1.getNodo());
        nodo.agregarHijo(":");
        nodo.agregarHijoAST(this.exp2.getNodo());
        return nodo;
    }
}
module.exports = Ternario;