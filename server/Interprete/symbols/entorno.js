const symbolo1 = require('./Symbol.js');


class Entorno {

    constructor(nombre,anterior) {
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
                
            }
        }
        console.log(this.variables);
        return true
        
        
        
        
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