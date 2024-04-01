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
    : RCOUT MENOR_MENOR expresion PUNTOCOMA {$$=new Print($3);}
    | RCOUT MENOR_MENOR expresion MENOR_MENOR RENDL PUNTOCOMA {$$=new Print($3);}
    | RPRINTLN PARIZQ expresion PARDER PUNTOCOMA {$$=new Print($3);}

    
;
declaracion
    : tipos listaval IGUAL expresion PUNTOCOMA {$$=new Declaracion($1,$2,$4);}
    | tipos listaval PUNTOCOMA {$$=new Declaracion($1,$2,null);}
;

expresion 
    : MENOS expresion %prec 'UMENOS' {$$=new Aritmetica($2,$2,'NEGACION');}
    | expresion MAS expresion {$$=new Aritmetica($1,$3,$2);}
    | expresion MENOS expresion {$$=new Aritmetica($1,$3,$2);}
    | expresion POR expresion {$$=new Aritmetica($1,$3,$2);}
    | expresion REL_IGUAL expresion {$$=new Relacionales($1,$3,$2);}
    | expresion MENOR expresion {$$=new Relacionales($1,$3,$2);}
    | expresion MAYOR expresion {$$=new Relacionales($1,$3,$2);}
    | expresion MENORIGUAL expresion {$$=new Relacionales($1,$3,$2);}
    | expresion MAYORIGUAL expresion {$$=new Relacionales($1,$3,$2);}
    | expresion DIFERENTE expresion {$$=new Relacionales($1,$3,$2);}
    | expresion AND expresion {$$=new Logicos($1,$3,$2);}
    | expresion OR expresion {$$=new Logicos($1,$3,$2);}
    | NOT expresion {$$=new Logicos($2,$2,$1);}
    | datos {$$=$1;}
;

tipos
    : INT  {$$=$1;}
    | STD DOSPUNTOS DOSPUNTOS STRING {$$=$1;}
    | CHAR{$$=$1;}
    | BOOL  {$$=$1;}
    | DOUBLE    {$$=$1;}
;
listaval
    : listaval 'COMA' VARIABLES
    | VARIABLES
;

datos : ENTERO {$$=new Dato($1,'ENTERO');}
        | DECIMAL {$$=new Dato($1,'DECIMAL');}
        | CARACTER {$$=new Dato($1,'CHAR');}
        | CADENA {$$=new Dato($1,'CADENA');}
        | BOOL {$$=new Dato($1,'BOOL');}
        | VARIABLES {$$=$1;}
;