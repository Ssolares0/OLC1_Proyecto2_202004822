const e = require('express');
const analizador =require('../Analizador/parser.js');
const {instruccion,TipoInstruccion} = require('../Interprete/instruccion.js');
const {NodoAst} = require('../Interprete/graficar/NodoAst.js');
const {graficarArbol} = require('../Interprete/graficar/GraficarTree.js');
const {Entorno} = require('../Interprete/symbols/entorno.js');
const index = (req, res) => {
    res.status(200).json({message: "Funcionando"})
}

//funcion que nos permite analizar la entrada
const analizar = (req, res) => {
    const {entrada} = req.body; // se obtiene informacion del body
    let result = analizador.parse(entrada); //mandamos a analizar la entrada
    let regreso = "";
    //console.log(result);

    try{
        let init = new NodoAst("INICIO");
        let instrucciones = new NodoAst("INSTRUCCIONES");
        let entornoglobal = new Entorno(TipoInstruccion.GLOBAL,null);
        
        result.forEach(instruccion => {
            regreso +=instruccion.interpretar(entornoglobal);
            regreso += "\n";

            instrucciones.agregarHijoAST(instruccion.getNodo());
        });
        init.agregarHijoAST(instrucciones);
        respuesta = graficarArbol(init);

    } catch (error) {
        console.log("Hubo un Error al mandar la entrada a interpretar",error);
    }
    
    res.status(200).json({message: "Funcion analizar",salida:regreso}) //respuesta
}

const simbolos = (req, res) => {
   
    try{
        let c = Entorno.getEntorno();
        console.log(c);

    } catch (error) {
        console.log("Hubo un Error al mandar la entrada a interpretar",error);
    }
    
    res.status(200).json({message: "Funcion analizar",salida:regreso}) //respuesta
}


module.exports = {
    index,
    analizar,
    simbolos
}