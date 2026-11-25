// Función para mostrar y ocultar el sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}


// Initialize event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleSidebar);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Verificar el estado de los anuncios cuando el DOM está completamente cargado
    verificarNuevosAnuncios();
});




document.addEventListener("DOMContentLoaded", () => {
    verificarNuevosAnuncios();
    mostrarBurbujaSiNoSeHaVisitado();
});

function verificarNuevosAnuncios() {
    fetch('../php/anuncios.php', {
        method: 'POST',
        body: new URLSearchParams({ accion: 'cargar' })
    })
    .then(response => response.json())
    .then(anuncios => {
        const ultimoAnuncioGuardado = localStorage.getItem('ultimoAnuncioId');
        const ultimoAnuncioActual = anuncios.length > 0 ? anuncios[0].id : null;

        if (ultimoAnuncioActual && ultimoAnuncioActual !== ultimoAnuncioGuardado) {
            // Nuevo anuncio encontrado, guardar el ID y mostrar burbuja
            localStorage.setItem('nuevoAnuncio', 'true');
            localStorage.setItem('ultimoAnuncioId', ultimoAnuncioActual);
            mostrarBurbujaNuevoAnuncio();
        }
    })
    .catch(error => console.error('Error:', error));
}

function mostrarBurbujaSiNoSeHaVisitado() {
    const nuevoAnuncio = localStorage.getItem('nuevoAnuncio');
    if (nuevoAnuncio === 'true') {
        mostrarBurbujaNuevoAnuncio();
    }
}

function mostrarBurbujaNuevoAnuncio() {
    const sidebarAnuncios = document.querySelector('a[href="anuncios.html"]');
    
    if (sidebarAnuncios && !sidebarAnuncios.querySelector(".nueva-notificacion")) {
        const burbuja = document.createElement("span");
        burbuja.classList.add("nueva-notificacion");
        burbuja.textContent = "●"; // Puedes cambiar esto a un ícono o imagen
        sidebarAnuncios.appendChild(burbuja);
    }
}

// Llamar a esta función en la página de anuncios para eliminar la burbuja
if (window.location.pathname.includes('anuncios.html')) {
    document.addEventListener("DOMContentLoaded", () => {
        localStorage.removeItem('nuevoAnuncio'); // Marcar como visto al entrar a la página de anuncios
        const sidebarAnuncios = document.querySelector('a[href="anuncios.html"]');
        if (sidebarAnuncios) {
            const burbuja = sidebarAnuncios.querySelector(".nueva-notificacion");
            if (burbuja) {
                burbuja.remove();
            }
        }
    });
}

// ------------------- Funciones para Mensajes en Cursos -------------------
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay notificaciones de nuevos mensajes y mostrar burbuja
    verificarNotificaciones();

    function verificarNotificaciones() {
        const nuevoMensaje = localStorage.getItem('nuevoMensaje');
        if (nuevoMensaje === 'true') {
            mostrarBurbujaNuevoMensaje();
        }
        // Marcar las notificaciones como vistas solo si estamos en "Mis Cursos"
        if (window.location.pathname.includes('mis-cursos.html')) {
            localStorage.removeItem('nuevoMensaje');
            eliminarBurbujaNotificacion();
        }
    }

    function mostrarBurbujaNuevoMensaje() {
        const sidebarCursos = document.querySelector('a[href="mis-cursos.html"]');
        
        if (sidebarCursos && !sidebarCursos.querySelector(".nueva-notificacion")) {
            const burbuja = document.createElement("span");
            burbuja.classList.add("nueva-notificacion");
            burbuja.textContent = "●"; // Puedes cambiar esto a un ícono o imagen
            sidebarCursos.appendChild(burbuja);
        }
    }

    function eliminarBurbujaNotificacion() {
        const sidebarCursos = document.querySelector('a[href="mis-cursos.html"]');
        
        if (sidebarCursos) {
            const burbuja = sidebarCursos.querySelector(".nueva-notificacion");
            if (burbuja) {
                sidebarCursos.removeChild(burbuja);
            }
        }
    }
});


// ------------------- Funciones para Mensajes en Cursos -------------------
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si hay notificaciones de nuevos mensajes y mostrar burbuja
    verificarNotificaciones();

    function verificarNotificaciones() {
        const nuevoMensaje = localStorage.getItem('nuevoMensaje');
        if (nuevoMensaje === 'true') {
            mostrarBurbujaNuevoMensaje();
        }
        // Marcar las notificaciones como vistas solo si estamos en "Mis Cursos"
        if (window.location.pathname.includes('chats.html')) {
            localStorage.removeItem('nuevoMensaje');
            eliminarBurbujaNotificacion();
        }
    }

    function mostrarBurbujaNuevoMensaje() {
        const sidebarCursos = document.querySelector('a[href="chats.html"]');
        
        if (sidebarCursos && !sidebarCursos.querySelector(".nueva-notificacion")) {
            const burbuja = document.createElement("span");
            burbuja.classList.add("nueva-notificacion");
            burbuja.textContent = "●"; // Puedes cambiar esto a un ícono o imagen
            sidebarCursos.appendChild(burbuja);
        }
    }

    function eliminarBurbujaNotificacion() {
        const sidebarCursos = document.querySelector('a[href="chats.html"]');
        
        if (sidebarCursos) {
            const burbuja = sidebarCursos.querySelector(".nueva-notificacion");
            if (burbuja) {
                sidebarCursos.removeChild(burbuja);
            }
        }
    }
});


