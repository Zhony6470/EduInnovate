document.addEventListener('DOMContentLoaded', () => {
    fetchStudents();
});

function fetchStudents() {
    fetch('../php/obtener-estudiantes.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const studentTableBody = document.getElementById('student-table-body');
            studentTableBody.innerHTML = ''; // Limpiar contenido existente

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(student => {
                    const row = document.createElement('tr');
                    row.setAttribute('data-cedula', student.cedula);
                    row.innerHTML = `
                        <td>${student.cedula}</td>
                        <td>${student.nombre}</td>
                        <td>${student.apellido}</td>
                        <td>${student.email}</td>
                        <td>${student.telefono}</td>
                        <td>
                            <button onclick="editStudent('${student.cedula}')">Editar</button>
                            <button onclick="deleteStudent('${student.cedula}', '${student.nombre}', '${student.apellido}')">Eliminar</button>
                        </td>
                    `;
                    studentTableBody.appendChild(row);
                });
            } else {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="6">No hay estudiantes registrados.</td>';
                studentTableBody.appendChild(noDataRow);
            }
        })
        .catch(error => {
            console.error('Error fetching students:', error);
        });
}

function editStudent(cedula) {
    window.location.href = `editar-estudiante.html?cedula=${cedula}`;
}

function deleteStudent(cedula, nombre, apellido) {
    const confirmation = confirm(`¿Estás seguro de que deseas eliminar al estudiante ${nombre} ${apellido}?`);
    
    if (confirmation) {
        fetch(`../php/eliminar-estudiante.php?cedula=${cedula}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                const row = document.querySelector(`tr[data-cedula="${cedula}"]`);
                if (row) {
                    row.remove();
                }
                alert('Estudiante eliminado exitosamente.');
            } else {
                alert('Error al eliminar el estudiante.');
            }
        })
        .catch(error => {
            console.error('Error deleting student:', error);
        });
    }
}
