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
comentarios "//".* ;
 

%%
{comentarios}               {}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] {}

// -----> Reglas Lexicas

//Palabras Reservadas
"int"                   { return 'INT'; }
"string"                { return 'STRING'; }
"char"                  { return 'CHAR'; }
"bool"                  { return 'BOOL'; }
"double"                { return 'DOUBLE'; }
"std"                   { return 'STD'; }

"println"               { return 'RPRINTLN'; }
"cout"                  { return 'RCOUT'; }
"endl"                  { return 'RENDL'; }


"<<"                    { return 'MENOR_MENOR'; }
"("                     { return 'PARIZQ'; }
")"                     { return 'PARDER'; }
"{"                     { return 'LLAIZQ'; }
"}"                     { return 'LLADER'; }
";"                     { return 'PUNTOCOMA'; }
","                     { return 'COMA'; }
"+"                     { return 'MAS'; }
"-"                     { return 'MENOS'; }
"/"                     { return 'DIV'; }
"*"                     { return 'POR'; }
"^"                     {return "POTENCIA";}
"%"                     {return "MODULO";}
//Operadores Relacionales
"<="                    { return 'MENORIGUAL'; }
"<"                     { return 'MENOR'; }
">="                    { return 'MAYORIGUAL'; }
">"                     { return 'MAYOR'; }
"!="                    { return 'DIFERENTE'; }
"=="                    { return 'REL_IGUAL'; }
"="                     { return 'IGUAL'; }

//ternarios
"?"                     { return 'TERNARIO'; }
":"                     { return 'DOSPUNTOS'; }

//Operadores Logicos
"||"                   { return 'OR'; }
"&&"                   { return 'AND'; }
"!"                     { return 'NOT'; }





// -----> Espacios en Blanco
[ \s\r\n\t]             {/* Espacios se ignoran */}

{decimal}               { return 'DECIMAL'; }
{entero}                { return 'ENTERO'; } 

{caracter}              { return 'CARACTER'; }
{cadena}                { return 'CADENA'; }
{bool}                  { return 'BOOL'; }
{variables}             { return 'VARIABLES'; }




// -----> FIN DE CADENA Y ERRORES
<<EOF>>               return 'EOF';
.  { console.error('Error léxico: \"' + yytext + '\", linea: ' + yylloc.first_line + ', columna: ' + yylloc.first_column);  }


/lex
// ################## ANALIZADOR SINTACTICO ######################
// -------> Precedencia

%{
    const {TipoDato}= require('../Interprete/Expresion.js');
    const Dato = require('../Interprete/expresion/Dato.js');
    const Print = require('../Interprete/instruccion/print.js');
    const Aritmetica =require('../Interprete/expresion/Aritmetica.js');
    const Logicos =require('../Interprete/expresion/Logicos.js');
    const Relacionales =require('../Interprete/expresion/Relacionales.js');
    const Declaracion =require('../Interprete/instruccion/declaracion.js');

%}

%left 'OR' 
%left 'AND' 
%left 'REL_IGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR'  'MAYORIGUAL'
%left 'MAS' 'MENOS'
%left 'DIV' 'POR'
%left 'POTENCIA' 'MODULO'


%right 'NOT'

// -------> Simbolo Inicial
%start inicio


%% // ------> Gramatica

inicio
	: listainstruccion EOF  {$$=$1; return $$;}
;

listainstruccion 
    : listainstruccion instruccion   { $$ = $1; $$.push($2);}
    | instruccion                    {$$=[]; $$.push($1);} 
;

instruccion
	: print  {$$=$1;}
    | declaracion {$$=$1;}
	| error 	{console.error('Error sintáctico: ' + yytext + ',  linea: ' + this._$.first_line + ', columna: ' + this._$.first_column);}
;

print
    : RCOUT MENOR_MENOR expresion PUNTOCOMA {$$=new Print($3,@1.first_line,@1.first_column);}
    | RCOUT MENOR_MENOR expresion MENOR_MENOR RENDL PUNTOCOMA {$$=new Print($3,@1.first_line,@1.first_column);}
    | RPRINTLN PARIZQ expresion PARDER PUNTOCOMA {$$=new Print($3,@1.first_line,@1.first_column);}

    
;
declaracion
    : tipos listaval IGUAL expresion PUNTOCOMA {$$=new Declaracion($2,$1,$4,@1.first_line,@1.first_column);}
    | tipos listaval PUNTOCOMA {$$=new Declaracion($2,$1,null,@1.first_line,@1.first_column);}
;

expresion 
    : MENOS expresion %prec 'UMENOS' {$$=new Aritmetica($2,$2,'NEGACION');}
    | expresion MAS expresion {$$=new Aritmetica($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion MENOS expresion {$$=new Aritmetica($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion POR expresion {$$=new Aritmetica($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion REL_IGUAL expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion MENOR expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion MAYOR expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion MENORIGUAL expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion MAYORIGUAL expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion DIFERENTE expresion {$$=new Relacionales($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion AND expresion {$$=new Logicos($1,$3,$2,@1.first_line,@1.first_column);}
    | expresion OR expresion {$$=new Logicos($1,$3,$2,@1.first_line,@1.first_column);}
    | NOT expresion {$$=new Logicos($2,$2,$1,@1.first_line,@1.first_column);}
    | datos {$$=$1;}

    ;


tipos
    : INT  {$$=$1;}
    | STD DOSPUNTOS DOSPUNTOS STRING {$$=$4;}
    | CHAR{$$=$1;}
    | BOOL  {$$=$1;}
    | DOUBLE    {$$=$1;}
;

listaval
    : listaval 'COMA' VARIABLES { $$.push($3);$$=$1}
    | VARIABLES {$$=[$1];}
;

datos : ENTERO {$$=new Dato($1,TipoDato.ENTERO,@1.first_line,@1.first_column);}
        | DECIMAL {$$=new Dato($1,TipoDato.DECIMAL,@1.first_line,@1.first_column);}
        | CARACTER {$$=new Dato($1,TipoDato.CHAR,@1.first_line,@1.first_column);}
        | CADENA {$$=new Dato($1,TipoDato.CADENA,@1.first_line,@1.first_column);}
        | BOOL {$$=new Dato($1,TipoDato.BOOL,@1.first_line,@1.first_column);}
        | VARIABLES {$$=$1;}
;