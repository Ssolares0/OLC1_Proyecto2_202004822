
class NodoAst{
    constructor(valor){
        this.valor = valor;
        this.listaHijos = [];
    }

    agregarHijo(val){
        this.listaHijos.push(new NodoAst(val));
    }

    agregarHijoAST(hijo){
        if (hijo!==undefined){
            this.listaHijos.push(hijo);
        }   
    }

    
}
exports.NodoAst = NodoAst;