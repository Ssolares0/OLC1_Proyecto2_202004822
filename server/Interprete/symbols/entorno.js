const symbolo1 = require('./Symbol.js');


class Entorno {

    constructor(subtable) {
        this.subtable = subtable;
        this.variables = new Map();
        this.funciones = new Map();

    }

    save_variable(id, value, typevar, typedata, line, column) {
        if (this.variables.has(id)) {
            return false;
        }
        this.variables.set(id, new symbolo1.Symbol( value, typevar, typedata, line, column ));
        return true;
    }
}
exports.Entorno = Entorno;  