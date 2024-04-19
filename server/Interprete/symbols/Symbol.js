

class Symbol {
    constructor(nombre,valor, tipo, typedata, line, column) {
        this.nombre = nombre;
        this.valor = valor;
        this.tipo = tipo;
        this.typedata = typedata;
        this.line = line;
        this.column = column;
        
    }
}   

const TipoSimbolo = {
    VARIABLE: 'VARIABLE',
    ARREGLO : 'ARREGLO',
    FUNCION : 'FUNCION',
}
module.exports = {Symbol,TipoSimbolo};