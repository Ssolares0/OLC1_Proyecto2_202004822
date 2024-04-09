
const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');

class Casebody {
    constructor(caseExp, body) {
        this.caseExp = caseExp;
        this.body = body;
    }
}
class Switch extends instruccion {
    constructor(expresion, casos, defaults, fila, columna) {
        super(TipoInstruccion.SWITCH, fila, columna);
        this.expresion = expresion;
        this.casos = casos;
        this.defaults = defaults;

    }

    interpretar(entorno) {
        let entornoSwitch = new Entorno(TipoInstruccion.SWITCH, entorno);
        let cond = this.expresion.interpretar(entornoSwitch);
        let value = "";
        let bandera = true;

        if (this.casos != null) {
            for (let x = 0; x < this.casos.length; x++) {
             
                let caso = this.casos[x].case.interpretar(entornoSwitch);
                

                if (this.expresion.valor !== this.casos[x].case.valor) {
                    //Errores semanticos
                    this.tipo == TipoDato.ERROR;
                    console.log("Existe un Error semantico en el case del switch");
                    return "";

                }


            }

        }
        if (this.casos != null) {
            for (let x = 0; x < this.casos.length; x++) {

                let caso = this.casos[x].case.interpretar(entornoSwitch);


                if (this.expresion.valor == this.casos[x].case.valor) {
                    const sub = this.casos[x].body;
                    for (let y = 0; y < sub.length; y++) {
                        
                        value += sub[y].interpretar(entornoSwitch);
                        bandera = false;
                        return value;
                    }

                }
                if (bandera ==false) {
                    break;
                }
            }
        }
        if (bandera ==true && this.defaults != null) {
            for (let x = 0; x < this.defaults.length; x++) {
                value += this.defaults[x].interpretar(entornoSwitch);
            }
        }
    }

    getNodo() {
        let nodo = new NodoAst("SWITCH");
        nodo.agregarHijo("switch");
        nodo.agregarHijo("(");
        // nodo.agregarHijoAST(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        /*
        this.casos.forEach(caso => {
            nodo.agregarHijoAST(caso.getNodo());
        });
        */
        nodo.agregarHijo("}");
        return nodo;
    }

}
module.exports = Switch;