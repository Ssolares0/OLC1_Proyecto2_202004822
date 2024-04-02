const {instruccion,TipoInstruccion} = require('../instruccion.js');
const {Entorno} = require('../symbols/entorno.js');


class If extends instruccion{
    constructor(condicion, instr,fila,columna){
        super(condicion,instr,fila,columna);
        this.condicion = condicion;
        this.instr = instr;
    }

    interpretar(entorno){
        let entornoIf= new Entorno(TipoInstruccion.IF,entorno);
        this.condicion.interpretar(entornoIf);

        if(this.condicion.tipo != 'BOOL'){
            console.log('Error semantico: la condicion no es booleana');
            return this;
        }
        if(String(this.condicion.valor).toLowerCase() ==="true"){
            this.instr.forEach(instruccion => {
                instruccion.interpretar(entornoIf);
                
            });
            //GUARDAMOS ENTORNO

        }else{
            //se trabaja else if etc
        }
        return this;
    }
}

module .exports = If;