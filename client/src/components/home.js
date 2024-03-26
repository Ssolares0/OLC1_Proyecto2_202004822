import React, { useState, useEffect } from 'react';
//import { ReactDOM } from 'react-dom';










export const Home = () => {
    const [entrada, setData] = useState('');

    const handleOpenFile = event => {
        const file = event.target.files[0]; // Obtiene el primer archivo seleccionado

        if (file && file.name.endsWith('.sc')) {
            const fileReader = new FileReader();


            fileReader.onload = () => {
                const fileContent = fileReader.result;
                // lo ponemos en el textarea
                document.querySelector('.text-area').value = fileContent;

                //guardar en el estado
                setData(fileContent);


                console.log('Contenido del archivo:', fileContent);
            };


            fileReader.readAsText(file);
        } else {
            alert('Por favor selecciona un archivo con extensión .sc');
        }
    };

    const handleTextAreaChange = event => {
        const text = event.target.value;
        setData(text);
    };

    const createFile = () => {
        document.querySelector('.text-area').value = '';
        setData('');
    };
    const saveFile = () => {
        const content = document.querySelector('.text-area').value;
        const blob = new Blob([content], { type: 'text/plain' });

        // Crea un objeto URL para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace temporal (a) para descargar el archivo
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;

        // Pregunta al usuario dónde quiere guardar el archivo y con qué nombre
        a.download = window.prompt('Ingrese el nombre del archivo', 'archivo.sc');

        // Simula un clic en el enlace para iniciar la descarga
        a.click();

        // Limpia el objeto URL y el enlace
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:4000/analizar', {
            method: 'POST',
            body: JSON.stringify({
                entrada: entrada,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())

            .then(result => {
                // Aquí puedes trabajar con la respuesta JSON recibida
                //lo mostramos en el text area 2


                document.querySelector('.text-area2').value = result.salida;
            })
            .catch(error => {
                console.log('Error:', error);
                // Manejo de errores
            });


    };


    return (


        <div className="screen">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">

                        <li class="nav-item">
                            <button id="crearArchivoBtn" class="btn btn-light" onClick={createFile} type="button">Crear Archivo</button>
                        </li>
                        <li class="nav-item">
                            <input type="file" accept=".sc" style={{ display: 'none' }} onChange={handleOpenFile} id="fileInput" />
                            <label htmlFor="fileInput" className="btn btn-light" >Abrir Archivo</label>
                        </li>
                        <li class="nav-item">
                            <button id="guardarArchivoBtn" class="btn btn-light" onClick={saveFile} type="button">Guardar Archivo</button>
                        </li>
                        <li class="nav-item">
                            <button id="compilarBtn" onClick={handleSubmit} class="btn btn-light" type="button">Ejecutar entrada</button>

                        </li>
                        <a class="nav-item nav-link" href="#">Reporte Errores</a>
                        <a class="nav-item nav-link" href="#">Generar Arbol AST</a>
                        <a class="nav-item nav-link disabled" href="#">Reporte Simbolos</a>
                    </div>
                </div>
            </nav>
            <div className="container">



                <form >

                    <textarea class="text-area" placeholder="Entrada" value={entrada} onChange={handleTextAreaChange}></textarea>


                </form>
                <form >

                    <textarea class="text-area2" placeholder="Salida" ></textarea>

                </form>

            </div>



        </div>

    );
}

