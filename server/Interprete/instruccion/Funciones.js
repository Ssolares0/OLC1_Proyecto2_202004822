const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');

class Funciones extends instruccion{
    constructor(id,tipo,parametros, instr,fila,columna){
        super(fila,columna);
        this.id = id;
        this.tipo = tipo;
        this.parametros = parametros;
        this.instr = instr;
    }

    interpretar(entorno){
        let error = false;
        let array = [];
      
        this.parametros.forEach(parametro => {
            let tmp = parametro.split(",");
            array.push(tmp[0]);
            
        });

        var i=0;
        array.forEach(x => {
            if (i != array.indexOf(x) //que no sea el mismo, porque ira a buscar el nombre a todo el array
                && array.indexOf(x) >= 0
            ) {
                //Errores semanticos 
                this.tipo = TipoDato.ERROR;   
                console.log("Semantico", `La funcion  '${this.id}' tiene un parametro repetido llamado '${x}'`, this.fila, this.columna);
                //errores.push(new Error("Semantico", "El parametro " + x + " ya existe en la funcion " + this.id, this.fila, this.columna));
                error = true;
                return "Error Semantico", `La funcion  '${this.id}' tiene un parametro repetido llamado '${x}'`, this.fila, this.columna;
            }
            i++
        });

        if (error) {
            return this;
        }
        
        entorno.save_funcion(this.id, this);
        return this;
        //imprimir 
    
    }
    getNodo(){
        let nodo = new NodoAst("FUNCION");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            nodo.agregarHijoAST(instruccion.getNodo());
        });
        nodo.agregarHijo("}");
        return nodo;
    }
}
module.exports = Funciones;