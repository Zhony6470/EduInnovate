document.addEventListener("DOMContentLoaded", () => {
    // Obtener el ID del curso desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const cursoId = urlParams.get('cursoId');

    // Función para cargar estudiantes desde la base de datos
    function cargarEstudiantes() {
        fetch(`../php/ver-matricula.php?cursoId=${cursoId}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById("estudiantes-table-body");
                tableBody.innerHTML = ""; // Limpiar la tabla antes de añadir los datos

                if (data.error) {
                    // Mostrar mensaje de error si ocurre uno
                    console.error("Error:", data.error);
                    tableBody.innerHTML = `<tr><td colspan="5">Hubo un problema al cargar los datos.</td></tr>`;
                } else {
                    data.forEach(estudiante => {
                        const row = document.createElement("tr");

                        const cedulaCell = document.createElement("td");
                        cedulaCell.textContent = estudiante.cedula;
                        row.appendChild(cedulaCell);

                        const nombreCell = document.createElement("td");
                        nombreCell.textContent = estudiante.nombre;
                        row.appendChild(nombreCell);

                        const apellidoCell = document.createElement("td");
                        apellidoCell.textContent = estudiante.apellido;
                        row.appendChild(apellidoCell);

                        const emailCell = document.createElement("td");
                        emailCell.textContent = estudiante.email; // Corregido de 'correo' a 'email'
                        row.appendChild(emailCell);

                        const telefonoCell = document.createElement("td");
                        telefonoCell.textContent = estudiante.telefono;
                        row.appendChild(telefonoCell);

                        tableBody.appendChild(row);
                    });
                }
            })
            .catch(error => {
                console.error("Error cargando estudiantes:", error);
                document.getElementById("estudiantes-table-body").innerHTML = `<tr><td colspan="5">Hubo un problema al cargar los datos.</td></tr>`;
            });
    }

    // Llamar a la función para cargar estudiantes cuando se cargue la página
    cargarEstudiantes();
});
