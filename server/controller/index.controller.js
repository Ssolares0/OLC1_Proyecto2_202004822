const e = require('express');
const analizador =require('../Analizador/parser.js');
const instruccion = require('../Interprete/instruccion.js');
const {NodoAst} = require('../Interprete/simbol/NodoAst.js');
const {graficarArbol} = require('../Interprete/simbol/GraficarTree.js');
const index = (req, res) => {
    res.status(200).json({message: "Funcionando"})
}

//funcion que nos permite analizar la entrada
const analizar = (req, res) => {
    const {entrada} = req.body; // se obtiene informacion del body
    let result = analizador.parse(entrada); //mandamos a analizar la entrada
    //console.log(result);

    try{
        let init = new NodoAst("INICIO");
        let instrucciones = new NodoAst("INSTRUCCIONES");
        let respuesta ="";
        result.forEach(instruccion => {
            
            instruccion.interpretar(null);
            instrucciones.agregarHijoAST(instruccion.getNodo());
        });
        init.agregarHijoAST(instrucciones);
        respuesta = graficarArbol(init);

    } catch (error) {
        console.log("Hubo un Error al mandar la entrada a interpretar");
    }

    res.status(200).json({message: "Funcion analizar",salida:result}) //respuesta
}


module.exports = {
    index,
    analizar
}