document.addEventListener("DOMContentLoaded", () => {
    const anunciosContainer = document.getElementById("anuncios-container");
    const anuncioForm = document.getElementById("anuncio-form");

    // Cargar anuncios desde la base de datos
    cargarAnuncios();

    // Publicar anuncio
    anuncioForm.addEventListener("submit", event => {
        event.preventDefault();
        publicarAnuncio();
    });

    // Eliminar anuncio
    anunciosContainer.addEventListener("click", event => {
        if (event.target.classList.contains("delete-button")) {
            const anuncioId = event.target.dataset.id;
            eliminarAnuncio(anuncioId);
        }
    });
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

        anuncios.forEach(anuncio => {
            const anuncioElement = document.createElement("div");
            anuncioElement.classList.add("anuncio");

            const anuncioTitulo = document.createElement("h4");
            anuncioTitulo.textContent = anuncio.titulo;

            const anuncioContenido = document.createElement("p");
            anuncioContenido.textContent = anuncio.contenido;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.classList.add("delete-button");
            deleteButton.dataset.id = anuncio.id;

            anuncioElement.appendChild(anuncioTitulo);
            anuncioElement.appendChild(anuncioContenido);
            anuncioElement.appendChild(deleteButton);
            anunciosContainer.appendChild(anuncioElement);
        });
    })
    .catch(error => console.error('Error:', error));
}

function publicarAnuncio() {
    const titulo = document.getElementById("titulo").value.trim();
    const contenido = document.getElementById("contenido").value.trim();

    if (titulo && contenido) {
        fetch('../php/anuncios.php', {
            method: 'POST',
            body: new URLSearchParams({ 
                accion: 'publicar',
                titulo: titulo,
                contenido: contenido 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
                cargarAnuncios();
                document.getElementById("anuncio-form").reset();
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

function eliminarAnuncio(id) {
    fetch('../php/anuncios.php', {
        method: 'POST',
        body: new URLSearchParams({ 
            accion: 'eliminar',
            id: id 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.success);
            cargarAnuncios();
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
