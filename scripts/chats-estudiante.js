document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("curso-table-body");

    // Cargar los cursos desde la base de datos
    fetch('../php/cursos-estudiante.php')
        .then(response => response.json())
        .then(cursos => {
            if (Array.isArray(cursos)) {
                tableBody.innerHTML = ''; // Limpiar la tabla antes de añadir filas
                cursos.forEach(curso => {
                    const row = document.createElement("tr");

                    const nombreCell = document.createElement("td");
                    nombreCell.textContent = curso.nombre;
                    row.appendChild(nombreCell);

                    const actionsCell = document.createElement("td");
                    actionsCell.innerHTML = `
                        <button class="boton-gestionar" onclick="abrirChat(${curso.id})">Chat</button>
                    `;
                    row.appendChild(actionsCell);

                    tableBody.appendChild(row);
                });
            } else {
                console.error('Datos de cursos inválidos:', cursos);
            }
        })
        .catch(error => console.error('Error cargando cursos:', error));
});

function abrirChat(cursoId) {
    // Redireccionar a la página de chat específica para el curso
    window.location.href = `chat.html?cursoId=${cursoId}`;
}

