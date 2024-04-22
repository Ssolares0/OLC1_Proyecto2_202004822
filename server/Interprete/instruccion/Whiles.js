
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');



class Whiles extends instruccion{
    constructor(condicion,instr,fila,columna){
        super(TipoInstruccion.WHILE,fila,columna);
        this.condicion = condicion;
        this.instr = instr;
    }

    interpretar(entorno){
        let entornoWhile = new Entorno(TipoInstruccion.WHILE,entorno);
        let cond = this.condicion.interpretar(entornoWhile);
        let value ="";
        if(this.condicion.tipo != 'BOOL'){
            console.log('Error semantico: la condicion no es booleana');
            return this;
        }
        console.log("este valor"+ this.condicion.valor)
        while(this.condicion.valor){
            let result = TipoInstruccion.WHILE;
            for (let i =0;i<this.instr.length;i++){
                let instruccion = this.instr[i];

                
                value += instruccion.interpretar(entornoWhile);
                value += "\n";

                if(instruccion.tipo ==  TipoInstruccion.BREAK){
                    result = TipoInstruccion.BREAK;
                    break;
                } else if (instruccion.tipo == TipoInstruccion.CONTINUE) {
                    result = TipoInstruccion.CONTINUE;
                    continue;
                }

            }
            if (result == TipoInstruccion.BREAK){
                break;
            } else if (result == TipoInstruccion.CONTINUE) {
                
                continue;
            }
            
            let cond = this.condicion.interpretar(entornoWhile);
            if(this.condicion.tipo != 'BOOL'){
               //Errores semanticos
               this.tipo == TipoDato.ERROR;
               console.log("Existe un Error semantico de tipo de dato");
               return this.valor;
            }
            if(this.condicion.valor == false){
                break;
            } else if (result == TipoInstruccion.BREAK){
                break;
            }
            
        }
        return value;
        

    }
    getNodo(){
        let nodo = new NodoAst("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            nodo.agregarHijoAST(instruccion.getNodo());
        });
        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = Whiles;