

class Symbol {
    constructor(value,id, typevar, typedata,scope, line, column) {
        this.value = value;
        this.id = id;
        this.typevar = typevar;
        this.typedata = typedata;
        this.scope = scope;
        this.line = line;
        this.column = column;
    }
}   
module.exports = Symbol;