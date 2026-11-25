document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.getElementById("carrera-table-body");

    // Cargar los grupos de la base de datos
    fetch("../php/gestionar-carreras.php?action=obtener")
        .then(response => response.json())
        .then(grupos => {
            if (grupos.length === 0) {
                tableBody.innerHTML = "<tr><td colspan='2'>No hay grupos disponibles.</td></tr>";
            } else {
                grupos.forEach(grupo => {
                    // Agregar fila a la tabla
                    const row = document.createElement("tr");

                    const nombreCell = document.createElement("td");
                    nombreCell.textContent = grupo.nombre;
                    row.appendChild(nombreCell);

                    const actionsCell = document.createElement("td");
                    actionsCell.innerHTML = `
                        <button class="boton-gestionar edit-group" data-id="${grupo.id}">Modificar</button>
                        <button class="boton-gestionar delete-group" data-id="${grupo.id}">Eliminar</button>
                    `;
                    row.appendChild(actionsCell);

                    tableBody.appendChild(row);
                });

                // Modificar grupo
                document.querySelectorAll(".edit-group").forEach(button => {
                    button.addEventListener("click", () => {
                        const grupoId = button.dataset.id;
                        window.location.href = `modificar-grupo.html?grupoId=${grupoId}`;
                    });
                });

                // Eliminar grupo
                document.querySelectorAll(".delete-group").forEach(button => {
                    button.addEventListener("click", () => {
                        const grupoId = button.dataset.id;
                        const confirmacion = confirm("¿Está seguro de que desea eliminar este grupo?");
                        if (confirmacion) {
                            fetch(`../php/gestionar-carreras.php?action=eliminar&id=${grupoId}`, {
                                method: 'GET'
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Error en la solicitud: ' + response.status);
                                }
                                return response.json();
                            })
                            .then(data => {
                                if (data.success) {
                                    alert("Grupo eliminado exitosamente.");
                                    window.location.reload();
                                } else {
                                    alert("Error al eliminar el grupo.");
                                }
                            })
                            .catch(error => {
                                console.error('Error al eliminar el grupo:', error);
                                alert("Error en la solicitud.");
                            });
                        }
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar los grupos:', error);
            alert("Error en la solicitud.");
        });
});
