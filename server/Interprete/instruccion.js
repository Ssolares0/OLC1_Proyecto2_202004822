
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
    SWITCH: 'SWITCH',
    WHILE: 'WHILE',
    DOWHILE: 'DOWHILE',
    GLOBAL : 'GLOBAL',
    FOR: 'FOR',
    FUNCION: 'FUNCION',
    METODO: 'METODO',
    BREAK: 'BREAK',
    CONTINUE: 'CONTINUE',
    RETURN: 'RETURN',
    LLAMADA: 'LLAMADA',
}

module.exports = {instruccion,TipoInstruccion};