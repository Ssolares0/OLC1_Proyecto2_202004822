const instruccion = require('../instruccion.js');


class Dato extends instruccion {
    constructor(valor, tipo) {
        super();
        this.valor = valor;
        this.tipo = tipo;

    }

    interpretar(entorno) {
        switch (this.tipo) {
            case "ENTERO":
                return Number(this.valor);
            case "STRING":
                var cadenaSincomillas = this.valor.slice(1, -1);
                return cadenaSincomillas;
            case "DOUBLE":
                return Number(this.valor);
            case "BOOL":
                return this.valor;
            case 'CHAR':
                return this.valor;
            
        }
    }
}

module.exports = Dato;