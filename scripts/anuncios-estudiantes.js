document.addEventListener("DOMContentLoaded", () => {
    const anunciosContainer = document.getElementById("anuncios-container");

    // Cargar anuncios desde la base de datos
    cargarAnuncios();
});

function cargarAnuncios() {
    fetch('../php/anuncios.php', {
        method: 'POST',
        body: new URLSearchParams({ accion: 'cargar' })
    })
    .then(response => response.json())
    .then(anuncios => {
        const anunciosContainer = document.getElementById("anuncios-container");
        anunciosContainer.innerHTML = '';

        // Mostrar los anuncios en el contenedor
        anuncios.forEach(anuncio => {
            const anuncioElement = document.createElement("div");
            anuncioElement.classList.add("anuncio");

            const anuncioTitulo = document.createElement("h4");
            anuncioTitulo.textContent = anuncio.titulo;

            const anuncioContenido = document.createElement("p");
            anuncioContenido.textContent = anuncio.contenido;

            anuncioElement.appendChild(anuncioTitulo);
            anuncioElement.appendChild(anuncioContenido);
            anunciosContainer.appendChild(anuncioElement);
        });

        // Verificar si hay nuevos anuncios y mostrar la burbuja en el sidebar
        verificarNuevosAnuncios(anuncios);
    })
    .catch(error => console.error('Error:', error));
}


// notificacion.js

function verificarNuevosAnuncios(anuncios) {
    // Obtener el último anuncio almacenado en localStorage
    const ultimoAnuncioGuardado = localStorage.getItem('ultimoAnuncioId');

    // Obtener el ID del último anuncio en la lista actual
    const ultimoAnuncioActual = anuncios.length > 0 ? anuncios[0].id : null;

    // Si hay un anuncio nuevo o no hay ninguno guardado previamente, mostrar burbuja
    if (ultimoAnuncioActual && ultimoAnuncioActual !== ultimoAnuncioGuardado) {
        mostrarBurbujaNuevoAnuncio();
        
        // Guardar el ID del último anuncio en localStorage
        localStorage.setItem('ultimoAnuncioId', ultimoAnuncioActual);
    }
}

function mostrarBurbujaNuevoAnuncio() {
    const sidebarAnuncios = document.querySelector('a[href="anuncios.html"]');
    
    // Verificar si ya existe la burbuja para no duplicarla
    if (!sidebarAnuncios.querySelector(".nueva-notificacion")) {
        const burbuja = document.createElement("span");
        burbuja.classList.add("nueva-notificacion");
        burbuja.textContent = "●"; // Puedes usar un símbolo o número
        sidebarAnuncios.appendChild(burbuja);
    }
}
