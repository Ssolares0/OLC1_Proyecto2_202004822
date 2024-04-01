const e = require('express');
const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');


class Aritmetica extends instruccion {
    constructor(val1, val2, operador) {
        super();
        this.val1 = val1;
        this.val2 = val2;
        this.operador = operador;
        this.tipo = 'ERROR';
        this.valor = 'null';

    }

    getNodo() {
        let nodo = new NodoAst("EXPRESION");
        nodo.agregarHijoAST(this.val1.getNodo());
        nodo.agregarHijo(this.operador);
        nodo.agregarHijoAST(this.val2.getNodo());
        return nodo;
    }

    interpretar(entorno) {


        let valorizq = this.val1.interpretar(null);
        let valorder = this.val2.interpretar(null);
        if (this.operador == '+') {
            //entero lado izquierdo
            if (this.val1.tipo == "ENTERO" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
                this.valor = valorizq + valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "DECIMAL" || this.val1.tipo == "DECIMAL" && this.val2.tipo == "ENTERO") {
                this.tipo = "DECIMAL";

                this.valor = parseFloat(valorizq) + parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
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
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "ENTERO") {
               
                

                this.tipo = "ENTERO";

                if (this.val1.tipo === "CHAR") {
                    let asciiIzq = this.val1.valor.charCodeAt(0);
                    this.valor = Number( asciiIzq) + Number(valorder);
                } else if (this.val2.tipo === "CHAR") {
                    let asciiDer = this.val2.valor.charCodeAt(0);
                    this.valor = +Number(valorizq) + Number(asciiDer);
                }
                return this.valor;

            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "ENTERO") {
                this.tipo = "CADENA";
                if (this.val1.tipo == "CADENA") {

                    this.valor = valorizq + valorder.toString();

                } else if (this.val2.tipo == "CADENA") {
                    this.valor = valorizq.toString() + valorder;
                }

                return this.valor;
            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "DECIMAL") {
                this.tipo = "DECIMAL";
                console.log("Entro a DECIMAL");
                this.valor = parseFloat(valorizq) + parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "DECIMAL") {
                this.tipo = "DECIMAL";
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
            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "DECIMAL") {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = "DECIMAL";

                if (this.val1.tipo == "CHAR") {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));
                        
                    }
                    this.valor = asciiIzq + valorder.parseFloat();

                } else if (this.val2.tipo == "CHAR") {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));
                        
                    }
                    this.valor = valorizq.parseFloat() + asciiDer;


                }
                return this.valor;
            }
            else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "DECIMAL") {
                this.tipo = "CADENA";
                if (this.val1.tipo == "CADENA") {

                    this.valor = valorizq + valorder.toString();

                } else if (this.val2.tipo == "CADENA") {
                    this.valor = valorizq.toString() + valorder;
                }

                return this.valor;

            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "BOOL") {
                console.log("No se puede sumar dos booleanos");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "BOOL") {
                console.log("No se puede sumar un booleano con un char");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "BOOL") {
                this.tipo = "CADENA";
                if (this.val1.tipo == "CADENA") {

                    if (valorder == "true") {
                        valorder = 1;
                        this.valor = valorizq + valorder.toString();

                    } else if (valorder == "false") {
                        valorder = 0;
                        this.valor = valorizq + valorder.toString();

                    }


                } else if (this.val2.tipo == "CADENA") {
                    if (valorizq == "true") {
                        valorizq = 1;
                        this.valor = valorizq.toString() + valorder;

                    } else if (valorizq == "false") {
                        valorizq = 0;
                        this.valor = valorizq.toString() + valorder;

                    }
                }
                return this.valor;
            } else if (this.val1.tipo == "CHAR" && this.val2.tipo == "CHAR") {
                this.tipo = "CADENA";
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
            } else if (this.val1.tipo == "CHAR" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "CHAR") {
                asciiDer = 0;
                asciiIzq = 0;

                this.tipo = "CADENA";
                if (this.val1.tipo == "CADENA") {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));
                    }
                    this.valor = valorizq + asciiDer.toString();
                } else if (this.val2.tipo == "CADENA") {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));
                    }
                    this.valor = asciiIzq.toString() + valorder;
                }
                return this.valor;
            }
            else if (this.val1.tipo == "CADENA" && this.val2.tipo == "CADENA") {
                this.tipo = "CADENA";
                this.valor = valorizq + valorder;
                return this.valor;
            } else {
                //Errores semanticos
                this.tipo == "ERROR";
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;

            }
        } else if (this.operador == '*') {
            if (this.val1.tipo == "ENTERO" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
                this.valor = valorizq * valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "DECIMAL" || this.val1.tipo == "DECIMAL" && this.val2.tipo == "ENTERO") {
                this.tipo = "DECIMAL";
                this.valor = parseFloat(valorizq) * parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "ENTERO") {
                console.log("No se puede multiplicar un entero con un booleano");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "ENTERO") {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = "ENTERO";

                if (this.val1.tipo == "CHAR") {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));

                    
                    this.valor = asciiIzq * valorder;

                } else if (this.val2.tipo == "CHAR") {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = valorizq * asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "ENTERO") {
                console.log("No se puede multiplicar una cadena con un entero");
                this.tipo = "ERROR";
                return this.valor;
            }
            else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "DECIMAL") {
                this.tipo = "DECIMAL";
                this.valor = parseFloat(valorizq) * parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "DECIMAL") {
                console.log("No se puede multiplicar un decimal con un booleano");
                this.tipo = "ERROR";
                return this.valor;
            }else if(this.val1.tipo =="DECIMAL" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "DECIMAL"){
                console.log("No se puede multiplicar un decimal con un char");
                this.tipo = "DECIMAL";
                let asciiDer = 0;
                let asciiIzq = 0;

                if (this.val1.tipo == "CHAR") {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));

                    
                    this.valor = parseFloat(asciiIzq) * parseFloat(valorder);

                } else if (this.val2.tipo == "CHAR") {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = parseFloat(valorizq) *parseFloat( asciiDer);
                }
                return this.valor;

            } 
            else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "DECIMAL") {
                console.log("No se puede multiplicar una cadena con un decimal");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "BOOL") {
                console.log("No se puede multiplicar dos booleanos");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "BOOL") {
                console.log("No se puede multiplicar un booleano con un char");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "BOOL") {
                console.log("No se puede multiplicar un booleano con una cadena");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "CHAR" && this.val2.tipo == "CHAR") {
                console.log("No se puede multiplicar dos caracteres");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "CHAR" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "CHAR") {
                console.log("No se puede multiplicar un caracter con una cadena");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "CADENA" && this.val2.tipo == "CADENA") {
                console.log("No se puede multiplicar dos cadenas");
                this.tipo = "ERROR";
                return this.valor;
            }

            else {
                //Errores semanticos
                this.tipo == "ERROR";
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador == '-') {
            if (this.val1.tipo == "ENTERO" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
                this.valor = valorizq - valorder;
                return Number(this.valor);
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "DECIMAL" || this.val1.tipo == "DECIMAL" && this.val2.tipo == "ENTERO") {
                this.tipo = "DECIMAL";
                this.valor = parseFloat(valorizq) - parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
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
            } else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "ENTERO") {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = "ENTERO";

                if (this.val1.tipo == "CHAR") {
                    
                        asciiIzq += Number(valorizq.charCodeAt(0));
                    
                    this.valor = asciiIzq - valorder;

                } else if (this.val2.tipo == "CHAR") {
                    
                        asciiDer += Number(valorder.charCodeAt(0));

                    
                    this.valor = valorizq - asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == "ENTERO" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "ENTERO") {
                console.log("No se puede restar una cadena con un entero");
                this.tipo = "ERROR";
                return this.valor;
            }
            else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "DECIMAL") {
                this.tipo = "DECIMAL";
                this.valor = parseFloat(valorizq) - parseFloat(valorder);
                return (this.valor);

            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "BOOL" || this.val1.tipo == "BOOL" && this.val2.tipo == "DECIMAL") {
                this.tipo = "DECIMAL";
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
            } else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "CHAR" || this.val1.tipo == "CHAR" && this.val2.tipo == "DECIMAL") {
                let asciiDer = 0;
                let asciiIzq = 0;
                this.tipo = "DECIMAL";

                if (this.val1.tipo == "CHAR") {
                    for (const x in valorizq) {
                        asciiIzq += Number(valorizq.charCodeAt(x));

                    }
                    this.valor = asciiIzq - valorder;

                } else if (this.val2.tipo == "CHAR") {
                    for (const x in valorder) {
                        asciiDer += Number(valorder.charCodeAt(x));

                    }
                    this.valor = valorizq - asciiDer;
                }
                return this.valor;
            }
            else if (this.val1.tipo == "DECIMAL" && this.val2.tipo == "CADENA" || this.val1.tipo == "CADENA" && this.val2.tipo == "DECIMAL") {
                console.log("No se puede restar una cadena con un decimal");
                this.tipo = "ERROR";
                return this.valor;
            } else if (this.val1.tipo == "BOOL" && this.val2.tipo == "BOOL") {
                console.log("No se puede restar dos booleanos");
            }else {
                //Errores semanticos
                this.tipo == "ERROR";
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador =='NEGACION'){
            if ( this.val1.tipo == "ENTERO"){
                this.tipo = "ENTERO";
                this.valor = -1*valorizq;
                return this.valor;

            } else if (this.val1.tipo == "DECIMAL"){
                this.tipo = "DECIMAL";
                this.valor = parseFloat(-1.0)*parseFloat(valorizq);
                return this.valor;

            }
            else {
                //Errores semanticos
                this.tipo == "ERROR";
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        } else if (this.operador=='/' ){

        }

    }
}

module.exports = Aritmetica;