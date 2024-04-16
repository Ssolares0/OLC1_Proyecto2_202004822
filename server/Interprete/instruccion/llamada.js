const { instruccion, TipoInstruccion } = require('../instruccion.js')
const { Entorno } = require('../symbols/entorno.js');
const { NodoAst } = require('../graficar/NodoAst.js');
const { TipoDato } = require('../Expresion.js');
const { TipoSimbolo } = require('../symbols/Symbol.js');
const Breaks = require('./breaks.js');


class Llamada extends instruccion{
    constructor(id,parametros,fila,columna){
        super(fila,columna);
        this.id = id;
        this.parametros = parametros;
        this.fila = fila;
        this.columna = columna;
    }

    interpretar(entorno){
     
        
        const func = entorno.get_funcion(this.id);
        const metodo = entorno.get_metodo(this.id);
        let value = "";

       

        if(func == null && metodo == null){
            //Errores semanticos
            this.tipo = TipoDato.ERROR;
            console.log("Error Semantico: La funcion no existe");
            return "Error Semantico: La funcion no existe";
        }
        
        if(func != null && metodo == null){
            if(func.parametros.length != this.parametros.length){
                //Errores semanticos
                this.tipo = TipoDato.ERROR;
                console.log("Error Semantico: La cantidad de parametros no coincide");
                return "Error Semantico: La cantidad de parametros no coincide";
            }

            //almacenamos los tipos de la expresion y guardamos en un array
            let array = [];
            this.parametros.forEach(parametro => {
                array.push(parametro.tipo);
            });

            //recorrer los parametros

            for (let i = 0; i < func.parametros.length; i++) {
                const elemento = func.parametros[i].split(",")[1];
         
                if(elemento.toLowerCase()=="int" && array[i] == TipoDato.ENTERO|| 
                    elemento.toLowerCase()=="double" && array[i] == TipoDato.DECIMAL|| 
                    elemento.toLowerCase()=="string" && array[i] == TipoDato.CADENA|| 
                    elemento.toLowerCase()=="char" && array[i] == TipoDato.CHAR|| 
                    elemento.toLowerCase()=="boolean" && array[i] == TipoDato.BOOL){
                    
                } else{
                    //Errores semanticos
                    this.tipo = TipoDato.ERROR;
                    console.log("Error Semantico: El tipo de parametro no coincide");
                    return "Error Semantico: El tipo de parametro no coincide, en la posicion: "+i+" de la funcion: "+this.id+" se esperaba un tipo: "+elemento+" y se recibio un tipo: "+array[i];

                }

            }
            //aqui ya podemos invocar a la funcion
            const nuevoEntorno = new Entorno(TipoInstruccion.FUNCION,entorno);
            
            let i =0;
            this.parametros.forEach(parametro => {
                
                const valor = parametro.interpretar(entorno);
                //falta arreglar el tipo
                
                nuevoEntorno.save_variable(func.parametros[i].split(",")[0].toString(),valor,parametro.tipo,TipoSimbolo.VARIABLE,this.fila,this.columna);
                i++;
            });

            
            //ver el objeto como json
            
           

            func.instr.forEach(instruccion => {
                value +=instruccion.interpretar(nuevoEntorno);
                value += "\n"; 
               
           });
           return value;

            
            

        }
        if(func == null && metodo != null){
            if(metodo.parametros.length != this.parametros.length){
                //Errores semanticos
                this.tipo = TipoDato.ERROR;
                console.log("Error Semantico: La cantidad de parametros no coincide");
                return "Error Semantico: La cantidad de parametros no coincide";
            }

            //almacenamos los tipos de la expresion y guardamos en un array
            let array = [];
            this.parametros.forEach(parametro => {
                array.push(parametro.tipo);
            });

            //recorrer los parametros

            for (let i = 0; i < metodo.parametros.length; i++) {
                const elemento = metodo.parametros[i].split(",")[1];
                console.log("elemento: "+elemento+" array: "+array[i]);
                if(elemento.toLowerCase()=="int" && array[i] == TipoDato.ENTERO|| 
                    elemento.toLowerCase()=="double" && array[i] == TipoDato.DECIMAL|| 
                    elemento.toLowerCase()=="string" && array[i] == TipoDato.CADENA|| 
                    elemento.toLowerCase()=="char" && array[i] == TipoDato.CHAR|| 
                    elemento.toLowerCase()=="boolean" && array[i] == TipoDato.BOOL){
                    
                } else{
                    //Errores semanticos
                    this.tipo = TipoDato.ERROR;
                    console.log("Error Semantico: El tipo de parametro no coincide");
                    return "Error Semantico: El tipo de parametro no coincide, en la posicion: "+i+" de la funcion: "+this.id+" se esperaba un tipo: "+elemento+" y se recibio un tipo: "+array[i];

                }

            }
            //aqui ya podemos invocar a la funcion
            const nuevoEntorno = new Entorno(TipoInstruccion.METODO,entorno);
            
            let i =0;
            this.parametros.forEach(parametro => {
                console.log("parametro: "+parametro);
                const valor = parametro.interpretar(entorno);
                //falta arreglar el tipo
               
                nuevoEntorno.save_variable(metodo.parametros[i].split(",")[0],valor,parametro.tipo,TipoSimbolo.VARIABLE,this.fila,this.columna);
                i++;
            });

            
            //ver el objeto como json
            
           

            metodo.instr.forEach(instruccion => {
                value +=instruccion.interpretar(nuevoEntorno);
                value += "\n";
            });
            return value;
        }
    }

    getNodo(){
        let nodo = new NodoAst("LLAMADA");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        this.parametros.forEach(parametro => {
            
            nodo.agregarHijoAST(parametro.getNodo());
        });
        nodo.agregarHijo(")");
        return nodo;
    }
}
module.exports = Llamada;