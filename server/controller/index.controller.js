const analizador =require('../Analizador/parser.js');
const instruccion = require('../Interprete/instruccion.js');
const index = (req, res) => {
    res.status(200).json({message: "Funcionando"})
}

//funcion que nos permite analizar la entrada
const analizar = (req, res) => {
    const {entrada} = req.body; // se obtiene informacion del body
    let result = analizador.parse(entrada); //mandamos a analizar la entrada
    console.log(result);

    result.forEach(instruccion => {
        instruccion.interpretar(null);
    });
    
    res.status(200).json({message: "Funcion analizar",salida:result}) //respuesta
}


module.exports = {
    index,
    analizar
}