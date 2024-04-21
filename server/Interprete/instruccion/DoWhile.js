const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const Breaks = require('./breaks.js');



class DoWhile extends instruccion {
    constructor(condicion, instr, fila, columna) {
        super(TipoInstruccion.DOWHILE, fila, columna);
        this.condicion = condicion;
        this.instr = instr;
    }
    interpretar(entorno) {
        let entornoWhile = new Entorno(TipoInstruccion.DOWHILE, entorno);
        let cond = this.condicion.interpretar(entornoWhile);
        let value = "";
        if (this.condicion.tipo != 'BOOL') {
            console.log('Error semantico: la condicion no es booleana');
            return "Error semantico: la condicion no es booleana o existe un error en la condicion";
        }
        console.log(this.condicion.valor)
        while (true) {

            if (this.condicion.valor) {
                let result = TipoInstruccion.DOWHILE;
                for (let i = 0; i < this.instr.length; i++) {
                    let instruccion = this.instr[i];


                    value += instruccion.interpretar(entornoWhile);
                    value += "\n";

                    if (instruccion.tipo == TipoInstruccion.BREAK) {
                        result = TipoInstruccion.BREAK;
                        break;
                    } else if (instruccion.tipo == TipoInstruccion.CONTINUE) {
                        result = TipoInstruccion.CONTINUE;
                        continue;
                    }

                }
                if (result == TipoInstruccion.BREAK) {
                    break;
                } else if (result == TipoInstruccion.CONTINUE) {

                    continue;
                }

            } else {
                break;
            }
            let cond = this.condicion.interpretar(entornoWhile);
            if (this.condicion.tipo != 'BOOL') {
                //Errores semanticos
                this.tipo = TipoDato.ERROR;
                console.log("Existe un Error semantico de tipo de dato");
                return "La condicion no es booleana Error! o existe un error en la condicion";
            }
            


        }
        return value;

    }
    getNodo(){
        let nodo = new NodoAst("DOWHILE");
        nodo.agregarHijo("do");
        nodo.agregarHijo("{");
        let nodoInstrucciones = new NodoAst("INSTRUCCIONES");
        for (let i = 0; i < this.instr.length; i++) {
            nodoInstrucciones.agregarHijoAST(this.instr[i].getNodo());
        }
        nodo.agregarHijoAST(nodoInstrucciones);
        nodo.agregarHijo("}");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo(";");
        return nodo;
    }
}
module.exports = DoWhile;