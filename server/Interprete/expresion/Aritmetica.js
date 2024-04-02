const e = require('express');
const instruccion = require('../instruccion.js');
const {Expresion,TipoDato} = require('../Expresion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { Entorno } = require('../symbols/entorno.js');


class Aritmetica extends Expresion {
    constructor(val1, val2, operador,fila,columna) {
        super("ERROR", TipoDato.ERROR, fila,columna)
        this.val1 = val1;
        this.val2 = val2;
        this.operador = operador;
        

    }

    

    interpretar(entorno) {

        
        let valorizq = this.val1.interpretar(entorno);
        let valorder = this.val2.interpretar(entorno);
        if (this.operador == '+') {
            //entero lado izquierdo
            if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                
                
                this.valor = valorizq + valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.DECIMAL || this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;

                this.valor = parseFloat(valorizq) + parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                if (valorder == "true") {
                    this.valor = valorizq + 1;

                } else if (valorder == "false") {
                    valorder = 0;
                    this.valor = valorizq + 0;

                } else if (valorizq == "true") {
                    this.valor = 1 + valorder;

                } else if (valorizq == "false") {

                    this.valor = 0 + valorder;
                }

                return Number(this.valor);
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.ENTERO) {
               
                

                this.tipo = TipoDato.ENTERO;

                if (this.val1.tipo === TipoDato.CHAR) {
                    let asciiIzq = this.val1.valor.charCodeAt(0);
                    this.valor = Number( asciiIzq) + Number(valorder);
                } else if (this.val2.tipo === TipoDato.CHAR) {
                    let asciiDer = this.val2.valor.charCodeAt(0);
                    this.valor = +Number(valorizq) + Number(asciiDer);
                }
                return this.valor;

            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.CADENA;
                if (this.val1.tipo == TipoDato.CADENA) {

                    this.valor = valorizq + valorder.toString();

                } else if (this.val2.tipo == TipoDato.CADENA) {
                    this.valor = valorizq.toString() + valorder;
                }

                return this.valor;
            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                
                this.valor = parseFloat(valorizq) + parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;;
                if (valorder == "true") {
                    this.valor = parseFloat(valorizq) + parseFloat(1);

                } else if (valorder == "false") {
                    valorder = 0;
                    this.valor = parseFloat(valorizq) + parseFloat(0);

                } else if (valorizq == "true") {
                    this.valor = parseFloat(1) + parseFloat(valorder);

                } else if (valorizq == "false") {

                    this.valor = parseFloat(0) + parseFloat(valorder);
                }

                return (this.valor);
            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.DECIMAL) {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = TipoDato.DECIMAL;

                if (this.val1.tipo == TipoDato.CHAR) {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));
                        
                    }
                    this.valor = asciiIzq + valorder.parseFloat();

                } else if (this.val2.tipo == TipoDato.CHAR) {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));
                        
                    }
                    this.valor = valorizq.parseFloat() + asciiDer;


                }
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.CADENA;
                if (this.val1.tipo == TipoDato.CADENA) {

                    this.valor = valorizq + valorder.toString();

                } else if (this.val2.tipo == TipoDato.CADENA) {
                    this.valor = valorizq.toString() + valorder;
                }

                return this.valor;

            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede sumar dos booleanos");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede sumar un booleano con un char");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.BOOL) {
                this.tipo = TipoDato.CADENA;
                if (this.val1.tipo == TipoDato.CADENA) {

                    if (valorder == "true") {
                        valorder = 1;
                        this.valor = valorizq + valorder.toString();

                    } else if (valorder == "false") {
                        valorder = 0;
                        this.valor = valorizq + valorder.toString();

                    }


                } else if (this.val2.tipo == TipoDato.CADENA) {
                    if (valorizq == "true") {
                        valorizq = 1;
                        this.valor = valorizq.toString() + valorder;

                    } else if (valorizq == "false") {
                        valorizq = 0;
                        this.valor = valorizq.toString() + valorder;

                    }
                }
                return this.valor;
            } else if (this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.CHAR) {
                this.tipo = TipoDato.CADENA;
                let asciiDer = 0
                let asciiIzq = 0

                for (const x in valorder) {
                    asciiDer += Number(valorder.charCodeAt(x))
                }

                for (const x in valorizq) {
                    asciiIzq += Number(valorizq.charCodeAt(x))
                }
                this.valor = asciiIzq.toString() + asciiDer.toString();
                return this.valor;
            } else if (this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.CHAR) {
                asciiDer = 0;
                asciiIzq = 0;

                this.tipo = TipoDato.CADENA;
                if (this.val1.tipo == TipoDato.CADENA) {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));
                    }
                    this.valor = valorizq + asciiDer.toString();
                } else if (this.val2.tipo == TipoDato.CADENA) {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));
                    }
                    this.valor = asciiIzq.toString() + valorder;
                }
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.CADENA) {
                this.tipo = TipoDato.CADENA;
                this.valor = valorizq + valorder;
                return this.valor;
            } else {
                //Errores semanticos
                this.tipo == TipoDato.ERROR;
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;

            }
        } else if (this.operador == '*') {
            if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = valorizq * valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.DECIMAL || this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = parseFloat(valorizq) * parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.ENTERO) {
                console.log("No se puede multiplicar un entero con un booleano");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.ENTERO) {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = TipoDato.ENTERO;

                if (this.val1.tipo == TipoDato.CHAR) {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));

                    
                    this.valor = asciiIzq * valorder;

                } else if (this.val2.tipo == TipoDato.CHAR) {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = valorizq * asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.ENTERO) {
                console.log("No se puede multiplicar una cadena con un entero");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = parseFloat(valorizq) * parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.DECIMAL) {
                console.log("No se puede multiplicar un decimal con un booleano");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            }else if(this.val1.tipo ==TipoDato.DECIMAL && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.DECIMAL){
                console.log("No se puede multiplicar un decimal con un char");
                this.tipo = TipoDato.DECIMAL;
                let asciiDer = 0;
                let asciiIzq = 0;

                if (this.val1.tipo == TipoDato.CHAR) {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));

                    
                    this.valor = parseFloat(asciiIzq) * parseFloat(valorder);

                } else if (this.val2.tipo == TipoDato.CHAR) {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = parseFloat(valorizq) *parseFloat( asciiDer);
                }
                return this.valor;

            } 
            else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.DECIMAL) {
                console.log("No se puede multiplicar una cadena con un decimal");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede multiplicar dos booleanos");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede multiplicar un booleano con un char");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede multiplicar un booleano con una cadena");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.CHAR) {
                console.log("No se puede multiplicar dos caracteres");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.CHAR) {
                console.log("No se puede multiplicar un caracter con una cadena");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.CADENA) {
                console.log("No se puede multiplicar dos cadenas");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            }

            else {
                //Errores semanticos
                this.tipo == TipoDato.ERROR;
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador == '-') {
            if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                this.valor = valorizq - valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.DECIMAL || this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.DECIMAL;
                this.valor = parseFloat(valorizq) - parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.ENTERO) {
                this.tipo = TipoDato.ENTERO;
                if (valorder == "true") {
                    this.valor = valorizq - 1;

                } else if (valorder == "false") {
                    valorder = 0;
                    this.valor = valorizq - 0;

                } else if (valorizq == "true") {
                    this.valor = 1 - valorder;

                } else if (valorizq == "false") {

                    this.valor = 0 - valorder;
                }
                return this.valor;
            } else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.ENTERO) {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = TipoDato.ENTERO;

                if (this.val1.tipo == TipoDato.CHAR) {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));
                    
                    this.valor = asciiIzq - valorder;

                } else if (this.val2.tipo == TipoDato.CHAR) {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = valorizq - asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.ENTERO && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.ENTERO) {
                console.log("No se puede restar una cadena con un entero");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;;
                this.valor = parseFloat(valorizq) - parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.BOOL || this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.DECIMAL) {
                this.tipo = TipoDato.DECIMAL;
                if (valorder == "true") {
                    this.valor = parseFloat(valorizq) - parseFloat(1);

                } else if (valorder == "false") {
                    valorder = 0;
                    this.valor = parseFloat(valorizq) - parseFloat(0);

                } else if (valorizq == "true") {
                    this.valor = parseFloat(1) - parseFloat(valorder);

                } else if (valorizq == "false") {

                    this.valor = parseFloat(0) - parseFloat(valorder);
                }
                return this.valor;
            } else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.CHAR || this.val1.tipo == TipoDato.CHAR && this.val2.tipo == TipoDato.DECIMAL) {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = TipoDato.DECIMAL;

                if (this.val1.tipo == TipoDato.CHAR) {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));

                    }
                    this.valor = asciiIzq - valorder;

                } else if (this.val2.tipo == TipoDato.CHAR) {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));

                    }
                    this.valor = valorizq - asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == TipoDato.DECIMAL && this.val2.tipo == TipoDato.CADENA || this.val1.tipo == TipoDato.CADENA && this.val2.tipo == TipoDato.DECIMAL) {
                console.log("No se puede restar una cadena con un decimal");
                this.tipo = TipoDato.ERROR;
                return this.valor;
            } else if (this.val1.tipo == TipoDato.BOOL && this.val2.tipo == TipoDato.BOOL) {
                console.log("No se puede restar dos booleanos");
            }else {
                //Errores semanticos
                this.tipo == TipoDato.ERROR;
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador =='NEGACION'){
            if ( this.val1.tipo == TipoDato.ENTERO){
                this.tipo = TipoDato.ENTERO;
                this.valor = -1*valorizq;
                return this.valor;

            } else if (this.val1.tipo == TipoDato.DECIMAL){
                this.tipo = TipoDato.DECIMAL;
                this.valor = parseFloat(-1.0)*parseFloat(valorizq);
                return this.valor;

            }
            else {
                //Errores semanticos
                this.tipo == TipoDato.ERROR;
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador=='/' ){

        }

    }
    getNodo() {
        let nodo = new NodoAst("EXPRESION");
        nodo.agregarHijoAST(this.val1.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoAST(this.val2.getNodo());
        return nodo;
    }
}

module.exports = Aritmetica;