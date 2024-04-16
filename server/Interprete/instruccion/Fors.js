const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');


class Fors extends instruccion{
    constructor(declaracion,condicion,incremento,instr,fila,columna){
        super(fila,columna);
        this.declaracion = declaracion;
        this.condicion = condicion;
        this.incremento = incremento;
        this.instr = instr;
    }

    interpretar(entorno){
        let entornoFor = new Entorno(TipoInstruccion.FOR,entorno);
        let declara = this.declaracion.interpretar(entornoFor);
       
        let cond = this.condicion.interpretar(entornoFor);
        
        let value ="";
        if(this.condicion.tipo != 'BOOL'){
            console.log('Error semantico: la condicion no es booleana');
            return this;
        }
       
        while(this.condicion.valor){
            let result = TipoInstruccion.FOR;
            for (let i =0;i<this.instr.length;i++){
                let instruccion = this.instr[i];
                value += instruccion.interpretar(entornoFor);
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
            
            this.incremento.interpretar(entornoFor);
            let cond = this.condicion.interpretar(entornoFor);
            if(this.condicion.tipo != 'BOOL'){
               //Errores semanticos
               this.tipo == TipoDato.ERROR;
               console.log("Existe un Error semantico de tipo de dato");
               return this.valor;
            }
            if(this.condicion.valor == false){
                break;
            }
            
        }
        
        return value;
        

    }
    getNodo(){
        let nodo = new NodoAst("FOR");
        nodo.agregarHijo("for");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.declaracion.getNodo());
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(";");
        nodo.agregarHijoAST(this.incremento.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            nodo.agregarHijoAST(instruccion.getNodo());
        });
        nodo.agregarHijo("}");
        return nodo;
    }
}

module.exports = Fors;