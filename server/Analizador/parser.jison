// ################### ANALIZADOR LEXICO #######################
%lex
%options case-insensitive 

// ---------> Expresiones Regulares
decimal [0-9]+(\.)[0-9]+;
entero  [0-9]+;
caracter  (\‘|\')(.{1,2})(\’|\');
cadena  (\"|\“)(\\.|[^\"])*(\"|\”);
bool  "true"|"false";
variables  [a-zA-Z_]+\w*;
comentarios "//".*;

%%
// -----> Reglas Lexicas

"println"                { return 'RPRINTLN'; }

"("                     { return 'PARIZQ'; }
")"                     { return 'PARDER'; }
"{"                     { return 'LLAIZQ'; }
"}"                     { return 'LLADER'; }
";"                     { return 'PUNTOCOMA'; }


{entero}                 { return 'ENTERO'; } 
{decimal}                { return 'DECIMAL'; }
{caracter}               { return 'CARACTER'; }
{cadena}                 { return 'CADENA'; }
{bool}                   { return 'BOOL'; }
{variables}              { return 'VARIABLES'; }

{comentarios}               {}
[/][][^][]+([^/][^][]+)*[/] {}



// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}

// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

//%left 'MAS' 'MENOS'

// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
	: listainstruccion EOF 
;

listainstruccion 
    : listainstruccion instruccion
    | instruccion 
;

instruccion
	: print
	| error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

print
    : RPRINTLN PARIZQ expresion PARDER PUNTOCOMA {console.log($3);}
    
;

expresion 
    : ENTERO {$$=$1;}
    | DECIMAL {$$=$1;}
    | CARACTER {$$=$1;}
    | CADENA {$$=$1;}
    | BOOL {$$=$1;}
    | VARIABLES {$$=$1;}
;