const { NodoAst } = require('../graficar/NodoAst.js');
const {Expresion,TipoDato} = require('../Expresion.js');

class Vars extends Expresion{
    constructor(id,linea,columna){
        super("ERROR",TipoDato.ERROR,linea,columna);
        this.id = id;
       
    }

    interpretar(entorno){
       
        let valor = entorno.get_variable(this.id);

        if (valor.tipoo == "ERROR") {
            valor = entorno.get_array(this.id);
            
        }

 
        //obtenemos los valores del diccionario
        let type = valor.tipoo;
        let value = valor.valorr;

        if(value == null){
            console.log("No se encuentra la variable o vector "+this.id);
            this.tipo = "ERROR";
            return value;
        }
        this.tipo = type;
        return value;
    }

    getNodo(){
       let nodo = new NodoAst("VARIABLE");
         nodo.agregarHijo(this.id.toString());
       return nodo;
    }

}
module.exports = Vars;