const symbolo1 = require('./Symbol.js');


class Entorno {

    constructor(nombre,anterior) {
        this.nombre = nombre;
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();

    }

    save_variable(nombre,valor, tipo, typedata, line, column) {
        if (this.variables.has(nombre)) {
            return false;
        }
        this.variables.set(nombre, new symbolo1.Symbol(nombre,valor, tipo, typedata, line, column));
        return true;
    }

    get_variable(nombre) {
        for (let e = this; e != null; e = e.anterior) {
            if (e.variables.has(nombre)) {
                return e.variables.get(nombre);
            }
        }
        return null;
    }

}
exports.Entorno = Entorno;  