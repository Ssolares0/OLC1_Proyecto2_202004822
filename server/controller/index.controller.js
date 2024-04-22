const e = require('express');
const analizador =require('../Analizador/parser.js');
const {instruccion,TipoInstruccion} = require('../Interprete/instruccion.js');
const {NodoAst} = require('../Interprete/graficar/NodoAst.js');
const {graficarArbol} = require('../Interprete/graficar/GraficarTree.js');
const {Entorno} = require('../Interprete/symbols/entorno.js');
const sng = require('../Interprete/singleton/Manager.js');


const index = (req, res) => {
    res.status(200).json({message: "Funcionando"})
}

//funcion que nos permite analizar la entrada
const analizar = (req, res) => {
    const {entrada} = req.body; // se obtiene informacion del body
    //borrar errores
    sng.clearError();
    //borrar simbolos
    sng.clearSymbol();
    let result = analizador.parse(entrada); //mandamos a analizar la entrada
    let init = new NodoAst("INICIO");
    let instrucciones = new NodoAst("INSTRUCCIONES");
    let regreso = "";

    
    

    try{
        
        let entornoglobal = new Entorno(TipoInstruccion.GLOBAL,null);
        
        result.forEach(instruccion => {
            regreso +=instruccion.interpretar(entornoglobal);
            regreso += "\n";

            instrucciones.agregarHijoAST(instruccion.getNodo());
        });
        

    } catch (error) {
        console.log(error);
        sng.addError(error);

    }
    init.agregarHijoAST(instrucciones);
    respuesta = graficarArbol(init);
    
    res.status(200).json({message: "Funcion analizar",salida:regreso}) //respuesta
}

const errores = (req, res) => {

    try{

        let html = `
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        ${sng.getError()}
        </div>
        `;
        //console.log(html);
        res.status(200).json({message: "Funcion Reporte errores",salida:html})
    } catch{
        console.log("Hubo un Error al ver errores");
    }
}

const simbolos = (req, res) => {
   
    try{
        
        let html = `
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        ${sng.getSymbol()}
        </div>
        `;
        //console.log(html);
        res.status(200).json({message: "Funcion Reporte errores",salida:html})
    } catch{
        console.log("Hubo un Error al ver symbols");
    }
}


module.exports = {
    index,
    analizar,
    errores,
    simbolos
}