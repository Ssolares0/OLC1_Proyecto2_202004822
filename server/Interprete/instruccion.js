
class instruccion {
    constructor(tipo,fila,columna){
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;

    }
    interpretar(entorno){

    }
}

const TipoInstruccion ={
    PRINT: 'PRINT',
    IF: 'IF',
    ELSE: 'ELSE',   
    DECLARACION: 'DECLARACION', 
}

module.exports = {instruccion,TipoInstruccion};