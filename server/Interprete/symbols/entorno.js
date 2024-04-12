const { TipoDato } = require('../Expresion.js');
const symbolo1 = require('./Symbol.js');


class Entorno {

    constructor(nombre, anterior) {
        this.nombre = nombre;
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();

    }

    save_variable(nombre, valor, tipo, typedata, line, column) {

        for (let i = 0; i < nombre.length; i++) {
            if (this.variables.has(nombre[i])) {
                return false;
            } else {
                this.variables.set(nombre[i], new symbolo1.Symbol(nombre[i], valor, tipo, typedata, line, column));
                console.log("Se guardo la variable: " + nombre[i] + " con valor: " + valor);

            }
        }

        return true

    }



    get_variable(nombre) {

        let valor = null;
        let tipo = "ERROR";

        if (this.variables.has(nombre)) {
            //console.log("Se encontro la variable: " + this.variables.get(nombre).valor);
            valor = this.variables.get(nombre).valor;
            tipo = this.variables.get(nombre).tipo;

            return { valorr: valor, tipoo: tipo };
        } else {
            // Si no se encuentra la variable en el entorno actual, buscar en el entorno anterior
            if (this.anterior != null) {
                return this.anterior.get_variable(nombre);
            } else {
                return { valorr: valor, tipoo: tipo };
            }
        }
    }

    actualizar_variable(nombre, valor) {
        if (this.variables.has(nombre)) {
            this.variables.get(nombre).valor = valor;
            console.log("Se actualizo la variable: " + nombre + " con valor: " + valor);
            return true;
        } else {
            if (this.anterior != null) {
                return this.anterior.actualizar_variable(nombre, valor);
            } else {
                console.log("No se encontro la variable: " + nombre);
                return false;
            }

        }
    }

    getEntorno() {
        let entorno = this;
        while (entorno != null) {
            for (const entry of env.variables.entries()) {
                const [key, value] = entry;

                tmp += `<tr>\n`;
                tmp += `\t<td>${key}</td>\n`;
                tmp += `\t<td>${getTipo(value.tipo)}</td>\n`; 
                tmp += `\t<td>Variable</td>\n`;
                tmp += `\t<td>${value.valor}</td>\n`;
                tmp += `\t<td>${value.line}</td>\n`;
                tmp += `\t<td>${value.column}</td>\n`;
                tmp += `</tr>\n`;
            }



        }
        return tmp;
    }

}
exports.Entorno = Entorno;  