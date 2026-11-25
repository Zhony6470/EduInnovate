document.addEventListener('DOMContentLoaded', () => {
    fetchProfessors();
});

function fetchProfessors() {
    fetch('../php/obtener-profesores.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const professorTableBody = document.getElementById('professor-table-body');
            professorTableBody.innerHTML = ''; // Limpiar contenido existente

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(professor => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-cedula', professor.cedula);
                    row.innerHTML = `
                        <td>${professor.cedula}</td>
                        <td>${professor.nombre}</td>
                        <td>${professor.apellido}</td>
                        <td>${professor.email}</td>
                        <td>${professor.telefono}</td>
                        <td>
                            <button onclick="editProfessor('${professor.cedula}')">Editar</button>
                            <button onclick="deleteProfessor('${professor.cedula}', '${professor.nombre}', '${professor.apellido}')">Eliminar</button>
                        </td>
                    `;
                    professorTableBody.appendChild(row);
                });
            } else {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="6">No hay profesores registrados.</td>';
                professorTableBody.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error('Error fetching professors:', error);
        });
}

function editProfessor(cedula) {
    window.location.href = `editar-profesor.html?cedula=${cedula}`;
}

function deleteProfessor(cedula, nombre, apellido) {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar al profesor ${nombre} ${apellido}?`);
    
    if (confirmation) {
        fetch(`../php/eliminar-profesor.php?cedula=${cedula}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                const row = document.querySelector(`tr[data-cedula="${cedula}"]`);
                if (row) {
                    row.remove();
                }
                alert('Profesor eliminado exitosamente.');
            } else {
                alert('Error al eliminar el profesor.');
            }
        })
        .catch(error => {
            console.error('Error deleting professor:', error);
        });
    }
}
