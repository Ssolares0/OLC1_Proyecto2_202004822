const { instruccion, TipoInstruccion } = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
//const Entorno = require('../symbols/entorno.js');
const { TipoSimbolo } = require('../symbols/Symbol.js');
const { TipoDato } = require('../Expresion.js');

class DecVec1D_tipo1 extends instruccion{
    constructor(tipo1,id,tipo2,exp,line,column) {
        super(line,column);
        this.tipo1 = tipo1;
        this.id = id;
        this.tipo2 = tipo2;
        this.exp = exp;
        

    }

    interpretar(entorno) {
       
        let tipo1 = this.tipo1;
        let id = this.id;
        let tipo2 = this.tipo2;
        let exp = this.exp.interpretar(entorno);


        if(tipo2 != null){
            
            console.log(tipo1 +id +"[]" + "= new"+tipo2+"["+exp+"]");
            let c = entorno.save_array(id, exp, tipo2, TipoSimbolo.ARREGLO, this.line, this.column);
            if (!c) {
                console.log("Error semantico: el arreglo " + id + " ya fue declarado anteriormente");
                return "Error semantico: el arreglo " + id + " ya fue declarado anteriormente";
            }
            return "vector 1D " + id + " creado";
            
        } else{
            console.log(tipo1 +id +"[]" + "= toCharArray ("+exp+")");
        }
        
        
    }
    getNodo(){
        let nodo = new NodoAst("DEC_VEC1D");
        nodo.agregarHijo(this.tipo1.toString());
        nodo.agregarHijo(this.id.toString());
        nodo.agregarHijo("[");
        nodo.agregarHijo("]");
        nodo.agregarHijo("=");
        nodo.agregarHijo("new");
        nodo.agregarHijo(this.tipo2.toString());
        nodo.agregarHijo("[");
        nodo.agregarHijoAST(this.exp.getNodo());
        nodo.agregarHijo("]");
        nodo.agregarHijo(";");
        return nodo;
    
    }
}
module.exports = DecVec1D_tipo1;