const { instruccion, TipoInstruccion } = require('../instruccion.js');
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');


class If extends instruccion {
    constructor(condicion, instr, siNo,fila, columna) {
        super(condicion, instr, fila, columna);
        this.condicion = condicion;
        this.instr = instr;
        this.siNo = siNo;
    }

    interpretar(entorno) {
        let entornoIf = new Entorno(TipoInstruccion.IF, entorno);
        let cond = this.condicion.interpretar(entornoIf);
        let value ="";

        if (this.condicion.tipo != 'BOOL') {
            console.log('Error semantico: la condicion no es booleana');
            return "Error semantico: la condicion no es booleana";
        }
        if (String(this.condicion.valor).toLowerCase() === "true") {

            for (let i = 0; i < this.instr.length; i++) {
                let instruccion = this.instr[i];
                value += instruccion.interpretar(entornoIf);
                value += "\n";
                if (instruccion.tipo == TipoInstruccion.BREAK) {
                    this.tipo= TipoInstruccion.BREAK;
                    break;
                }else if (instruccion.tipo == TipoInstruccion.CONTINUE) {
                    this.tipo= TipoInstruccion.CONTINUE;
                    continue;
                } 
            }
            
            return value;
            //GUARDAMOS ENTORNO
            
        } else {
            let entornoElse = new Entorno(TipoInstruccion.ELSE, entorno);
            if (this.siNo != null) {

                this.siNo.forEach(instruccion => {
                    value =instruccion.interpretar(entornoElse);
                    value += "\n";
                });
                return value;

            } 

            //se trabaja else if etc
        }
        return this;
    }
    getNodo() {
        let nodo = new NodoAst("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijoAST(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        this.instr.forEach(instruccion => {
            
            nodo.agregarHijo("println");
            nodo.agregarHijo("(");
            nodo.agregarHijoAST(instruccion.getNodo());
            nodo.agregarHijo(")");
            nodo.agregarHijo(";");
        });
        nodo.agregarHijo("}");
        return nodo;

    }
}

module.exports = If;