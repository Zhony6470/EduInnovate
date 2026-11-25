document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("curso-table-body");
    const carreraSelect = document.getElementById("grupo-select");

    // Cargar las carreras desde la base de datos
    fetch('../php/gestionar-cursos.php', {
        method: 'POST',
        body: new URLSearchParams({ accion: 'cargar_carreras' })
    })
    .then(response => response.json())
    .then(carreras => {
        if (Array.isArray(carreras)) {
            carreraSelect.innerHTML = ''; // Limpiar el select antes de añadir opciones
            carreras.forEach(carrera => {
                const option = document.createElement("option");
                option.value = carrera.id;
                option.textContent = carrera.nombre;
                carreraSelect.appendChild(option);
            });
        } else {
            console.error('Datos de carreras inválidos:', carreras);
        }
    })
    .catch(error => console.error('Error cargando carreras:', error));

    // Cargar los cursos desde la base de datos
    fetch('../php/gestionar-cursos.php', {
        method: 'POST',
        body: new URLSearchParams({ accion: 'cargar_cursos' })
    })
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
                    <button class="boton-gestionar" onclick="verMatricula(${curso.id})">Ver Matrícula</button>
                    <button class="boton-gestionar" onclick="eliminarCurso(${curso.id})">Eliminar Curso</button>
                `;
                row.appendChild(actionsCell);

                tableBody.appendChild(row);
            });
        } else {
            console.error('Datos de cursos inválidos:', cursos);
        }
    })
    .catch(error => console.error('Error cargando cursos:', error));

    // Agregar curso
    document.getElementById("agregar-curso").addEventListener("click", () => {
        const carreraId = carreraSelect.value;
        const nombreCurso = document.getElementById("nombre-curso").value.trim();

        if (carreraId && nombreCurso) {
            fetch('../php/gestionar-cursos.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    accion: 'agregar_curso',
                    carrera_id: carreraId,
                    nombre: nombreCurso
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.success);
                    location.reload(); // Recargar la página para actualizar la lista de cursos
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error('Error agregando curso:', error));
        } else {
            alert("Por favor, complete todos los campos.");
        }
    });
});

function verMatricula(cursoId) {
    // Lógica para ver la matrícula del curso
    console.log("Ver Matrícula del curso ID:", cursoId);
    // Redireccionar a la página de matrícula (reemplazar URL con la correcta)
    window.location.href = `ver-matricula.html?cursoId=${cursoId}`;
}

function eliminarCurso(cursoId) {
    // Confirmación antes de eliminar el curso
    const confirmacion = confirm("¿Está seguro de que desea eliminar este curso?");
    if (confirmacion) {
        fetch('../php/gestionar-cursos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                accion: 'eliminar_curso',
                curso_id: cursoId
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.success);
                location.reload(); // Recargar la página para actualizar la lista de cursos
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error eliminando curso:', error));
    }
}
