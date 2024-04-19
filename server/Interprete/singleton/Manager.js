// errorManager.js

let errorStorage = "";  // Almacena los errores en formato HTML string
let symbolStorage = ""; // Almacena los simbolos en formato HTML string

function addError(error) {
    errorStorage +=
        `<tr class="bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium whitespace-nowrap text-white">${error.title}</th>
            <td class="py-4 px-6">${error.description}</td>
            <td class="py-4 px-6">${error.fila}</td>
            <td class="py-4 px-6">${error.columna}</td>
            <td class="py-4 px-6">${error.error}</td>
        </tr>\n`;
    console.log("Error agregado");
}

function getError() {
    return `
    <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">Tipo de error</th>
                <th scope="col" class="py-3 px-6">Descripción</th>
                <th scope="col" class="py-3 px-6">Línea</th>
                <th scope="col" class="py-3 px-6">Columna</th>
                <th scope="col" class="py-3 px-6">Error</th>
            </tr>
        </thead>
        <tbody>${errorStorage}</tbody>
    </table>`;
}

function clearError() {
    errorStorage = "";
    console.log("Todos los errores han sido limpiados");
}

function addSymbol(nombre, valor, tipo, typedata, line, column) {
    symbolStorage +=
        `<tr class="bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium whitespace-nowrap text-white">${nombre}</th>
            <td class="py-4 px-6">${valor}</td>
            <td class="py-4 px-6">${tipo}</td>
            <td class="py-4 px-6">${typedata}</td>
            <td class="py-4 px-6">${line}</td>
            <td class="py-4 px-6">${column}</td>
        </tr>\n`;

    // Agregar simbolos
}
function getSymbol(){
    return `
    <table class="w-full text-sm text-left text-gray-400">
        <thead class="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">Nombre</th>
                <th scope="col" class="py-3 px-6">Valor</th>
                <th scope="col" class="py-3 px-6">Tipo</th>
                <th scope="col" class="py-3 px-6">Tipo de dato</th>
                <th scope="col" class="py-3 px-6">Línea</th>
                <th scope="col" class="py-3 px-6">Columna</th>
            </tr>
        </thead>
        <tbody>${symbolStorage}</tbody>
    </table>`;

}

function clearSymbol() {
    symbolStorage = "";
    console.log("Todos los simbolos han sido limpiados");
}

module.exports = { addError, getError, clearError, addSymbol,getSymbol,clearSymbol};