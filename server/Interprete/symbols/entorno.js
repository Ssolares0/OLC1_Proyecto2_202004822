const { TipoDato } = require('../Expresion.js');
const symbolo1 = require('./Symbol.js');



class Entorno {

    constructor(nombre, anterior) {
        this.nombre = nombre;
        this.anterior = anterior;
        this.variables = new Map();
        this.arrays = new Map();
        this.funciones = new Map();
        this.metodos = new Map();

    }

    save_variable(nombre, valor, tipo, typedata, line, column) {

        let separador = nombre.toString().split(',');
        
        for ( const i in separador) {
            if (this.variables.has(separador[i])) {
                return false;
            } else {
                this.variables.set(separador[i], new symbolo1.Symbol(separador[i], valor, tipo, typedata, line, column));
                console.log("Se guardo la variable: " + separador[i] + " con valor: " + valor);

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
    save_funcion(nombre, funcion) {
        if (this.funciones.has(nombre)) {
            console.log("Ya existe una funcion con el nombre: " + nombre);
            return false;
        } else {
            this.funciones.set(nombre, funcion);
            console.log("Se guardo la funcion: " + nombre);
            return true;
        }
    }

    get_funcion(nombre) {
        let entorno = this;
        while (entorno != null){
            if (entorno.funciones.has(nombre)) {
            
                return entorno.funciones.get(nombre);
            } else {
                if (this.anterior != null) {
                    return entorno.anterior.get_funcion(nombre);
                } else {
                    console.log("No se encontro la funcion: " + nombre);
                    return null;
                }
            }

        }
        
    }

    save_metodo(nombre, metodo) {
        if (this.metodos.has(nombre)) {
            console.log("Ya existe un metodo con el nombre: " + nombre);
            return false;
        } else {
            this.metodos.set(nombre, metodo);
            console.log("Se guardo el metodo: " + nombre);
            return true;
        }
    }
    get_metodo(nombre) {
        let entorno = this;

        while(entorno != null){
            if (entorno.metodos.has(nombre)) {
                return entorno.metodos.get(nombre);
            } else {
                if (this.anterior != null) {
                    return entorno.anterior.get_metodo(nombre);
                } else {
                    console.log("No se encontro el metodo: " + nombre);
                    return null;
                }
            }

        }
        
    }

    save_array(id,vector,tipo,typedata,line,column){
        let separador = id.toString().split(',');
        for ( const i in separador) {
            if (this.arrays.has(separador[i])) {
                return false;
            } else {
                //console.log("Se guardo el array: " + separador[i] + " con valor: " + new Array(vector));
                //agregar valores al array
                this.arrays.set(separador[i], new symbolo1.Symbol(separador[i], new Array(vector), tipo, typedata, this.line, this.column));
                console.log("Se guardo el array: " + separador[i]);
            }
        }
        return true;

        

    }
    get_array(id){
        let valor = null;
        let tipo = "ERROR";
        let idnew = id;

        console.log("id: " + id);

        
        if (this.arrays.has(idnew)) {
            
            
            valor = this.arrays.get(idnew).valor;
            tipo = this.arrays.get(idnew).tipo;

            return { valorr: valor, tipoo: tipo };
        } else {
            // Si no se encuentra la variable en el entorno actual, buscar en el entorno anterior
            if (this.anterior != null) {
                return this.anterior.get_array(id);
            } else {
                return { valorr: valor, tipoo: tipo };
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