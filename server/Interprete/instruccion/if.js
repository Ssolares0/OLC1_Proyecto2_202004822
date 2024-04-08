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
            return this;
        }
        if (String(this.condicion.valor).toLowerCase() === "true") {
            this.instr.forEach(instruccion => {
                 value +=instruccion.interpretar(entornoIf);
                 value += "\n"; 
                
            });
            return value;
            //GUARDAMOS ENTORNO
            
        } else {
            if (this.siNo != null) {

                this.siNo.forEach(instruccion => {
                    instruccion.interpretar(entornoIf);
                });
                

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
            //nodo.agregarHijoAST(instruccion.getNodo());
            nodo.agregarHijo(")");
            nodo.agregarHijo(";");
        });
        nodo.agregarHijo("}");
        return nodo;

    }
}

module.exports = If;