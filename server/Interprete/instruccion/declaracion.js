const instruccion = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const Entorno = require('../symbols/entorno.js');


class Declaracion extends instruccion {
    constructor(tipo, nombre, expresion, line, column) {
        super(line, column);
        this.expresion = expresion;
        this.tipo = tipo;
        this.nombre = nombre;
        this.line = line;
        this.column = column;
        

    }

    interpretar(entorno) {

        let tipo = this.tipo;
        let nombre = this.nombre;

        if (this.expresion == null) {

            if (tipo.toLowerCase() == "int") {
                this.valor = 0;
            } else if (tipo.toLowerCase() == "double") {
                this.valor = 0.0;
            } else if (tipo.toLowerCase() == "string") {
                this.valor = "";
            } else if (tipo.toLowerCase() == "char") {
                this.valor = ' ';
            } else if (tipo.toLowerCase() == "BOOL") {
                this.valor = true;
            }
            console.log("entro a declaracion sin expresion");
            console.log("tipo: " + tipo + " nombre: " + nombre + " valor: " + this.valor);
            /*
            let c = Entorno.save_variable(nombre,valor,tipo,this.line,this.column);
            if(c == false){
                console.log("Error semantico: la variable "+nombre+" ya existe");
                return;
            }
            */
        } else if (this.expresion != null) {
            let value = this.expresion.interpretar(entorno);

            if (this.tipo.toLowerCase() == 'int' ||
                this.tipo.toLowerCase() == 'double' ||
                this.tipo.toLowerCase() == 'bool' ||
                this.tipo.toLowerCase() == 'char' ||
                this.tipo.toLowerCase() == 'string') {

                //imprimimos los valores
                console.log("entro a declaracion con expresion");
                
                console.log("tipo: " + tipo + " nombre: " + nombre + " valor: " + value);

            }


        }else {
            //Errores semanticos
            this.tipo == "ERROR";
            console.log("Existe un Error semantico de tipo de dato");
            return this.valor;

        }



    }
    getNodo() {
        let nodo = new NodoAst("DECLARACION");
        nodo.agregarHijo(this.tipo);
        nodo.agregarHijo(this.nombre);
        if (this.expresion != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijoAST(this.expresion.getNodo());
        }
        nodo.agregarHijo(";");
        return nodo;
    }
}

module.exports = Declaracion;