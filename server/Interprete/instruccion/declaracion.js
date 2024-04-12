const { instruccion, TipoInstruccion } = require('../instruccion.js');
const { NodoAst } = require('../graficar/NodoAst.js');
//const Entorno = require('../symbols/entorno.js');
const { TipoSimbolo } = require('../symbols/Symbol.js');
const { TipoDato } = require('../Expresion.js');


class Declaracion extends instruccion {
    constructor(id, tipo, expresion, line, column) {
        super( line, column);
        this.expresion = expresion;
        this.id = id;
        this.tipo = tipo;
        this.line = line;   
        this.column = column;



    }

    interpretar(entorno) {

        let id = this.id;
        let tipo = this.tipo;

        if (this.expresion == null) {
            let value = null;
            if (tipo.toLowerCase() == "int") {
                value = 0;
            } else if (tipo.toLowerCase() == "double") {
                value = 0.0;
            } else if (tipo.toLowerCase() == "string") {
                value = "";
            } else if (tipo.toLowerCase() == "char") {
                value = ' ';
            } else if (tipo.toLowerCase() == "bool") {
                value = true;
            }
            console.log("entro a declaracion sin expresion");
            //console.log("Id: " + id + " tipo: " + tipo + " valor: " + this.expresion);

            let c = entorno.save_variable(id, value, tipo, TipoSimbolo.VARIABLE, this.line, this.column);
            if (!c) {
                console.log("Error semantico: la variable " + id + " ya fue declarada anteriormente");
                return;
            }

        } else if (this.expresion != null) {
            let value = this.expresion.interpretar(entorno);
            
            console.log("tipo: "+tipo.toLowerCase()+" expresion: "+this.expresion.tipo)
            if (tipo.toLowerCase() == 'int' && this.expresion.tipo == TipoDato.ENTERO|| 
                tipo.toLowerCase() == 'double' && this.expresion.tipo == TipoDato.DECIMAL||
                tipo.toLowerCase() == 'bool' && this.expresion.tipo == TipoDato.BOOL||
                tipo.toLowerCase() == 'char' && this.expresion.tipo == TipoDato.CHAR||
                tipo.toLowerCase() == 'string' && this.expresion.tipo == TipoDato.CADENA) {

                

                let c = entorno.save_variable(id, value, this.expresion.tipo, TipoSimbolo.VARIABLE, this.line, this.column);
                if (!c) {
                    console.log("Error semantico: la variable " + id + " ya fue declarada anteriormente");
                    return ;
                }
                return "Variable " + id + " declarada correctamente";
               // console.log("id: " + id + " tipo: " + tipo + " valor: " + value);

            } else{
                this.tipo == TipoDato.ERROR;
                console.log("Error semantico: el tipo de dato de la expresion no coincide con el tipo de la variable","Fila: "+this.line,"columna: "+this.column);
                return this.expresion;
            }


        } else {
            //Errores semanticos
            this.tipo == TipoDato.ERROR;
            console.log("Existe un Error semantico de tipo de dato");
            return this.expresion;

        }



    }
    getNodo() {
        let nodo = new NodoAst("DECLARACION");
        
        nodo.agregarHijo(this.tipo.toString());
        nodo.agregarHijo(this.id.toString());
        if (this.expresion != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijoAST(this.expresion.getNodo());
        }

        
       
        
        
        //nodo.agregarHijoAST(this.tipo.getNodo());
        // nodo.agregarHijoAST(this.id.getNodo());
        
        
        
        return nodo;
    }
}

module.exports = Declaracion;