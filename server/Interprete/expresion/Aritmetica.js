const instruccion = require('../instruccion.js');


class Aritmetica extends instruccion {
    constructor(val1, val2, operador) {
        super();
        this.val1 = val1;
        this.val2 = val2;
        this.operador = operador;
        this.tipo = 'ERROR';
        this.valor = 'null';

    }

    interpretar(entorno) {

        let valorizq = this.val1.interpretar(null);
        let valorder = this.val2.interpretar(null);
        if (this.operador == '+') {

            if (this.val1.tipo == "ENTERO" && this.val2.tipo == "ENTERO") {
                this.tipo = "ENTERO";
                this.valor = valorizq + valorder;
                return Number(this.valor);
            }else if (this.val1.tipo == "DOUBLE" && this.val2.tipo == "DOUBLE") {
                this.tipo = "DOUBLE";
                this.valor = valorizq + valorder;
                return Number(this.valor);

            } else if (this.val1.tipo == "STRING" && this.val2.tipo == "STRING") {
                this.tipo = "STRING";
                this.valor = valorizq + valorder;
                return this.valor;
            } else if (this.val1.tipo == "STRING" && this.val2.tipo == "ENTERO") {
                this.tipo = "STRING";
                this.valor = valorizq + valorder.toString();;
                return this.valor;
            }
            else {
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
            }
            else {
                //Errores semanticos
                this.tipo == "ERROR";
                console.log("Existe un Error semantico de tipo de dato");
                return this.valor;
            }
        }
    }
}

module.exports = Aritmetica;