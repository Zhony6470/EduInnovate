document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-student');
    const studentList = document.getElementById('student-list');
    const groupStudentList = document.getElementById('group-student-list');
    const saveButton = document.getElementById('save-changes');
    const grupoId = new URLSearchParams(window.location.search).get('grupoId');

    if (!grupoId) {
        alert("No se ha proporcionado un ID de grupo.");
        return;
    }

    // Función para actualizar la lista de estudiantes en el grupo
    function updateGroupStudents() {
        fetch(`../php/modificar-grupo.php?grupoId=${grupoId}`)
            .then(response => response.json())
            .then(data => {
                groupStudentList.innerHTML = '';
                data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${student.nombre} ${student.apellido}</td>
                        <td>${student.cedula}</td>
                        <td><button class="delete-student" data-id="${student.id}">Eliminar</button></td>
                    `;
                    groupStudentList.appendChild(row);
                });

                // Agregar eventos a los botones de eliminar
                document.querySelectorAll('.delete-student').forEach(button => {
                    button.addEventListener('click', function() {
                        const estudianteId = this.dataset.id;
                        fetch('../php/modificar-grupo.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                grupoId: grupoId,
                                estudianteId: estudianteId,
                                action: 'remove' // Indica que se quiere eliminar
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                this.closest('tr').remove();
                            } else {
                                alert('Error al eliminar el estudiante.');
                            }
                        })
                        .catch(error => console.error('Error al eliminar estudiante:', error));
                    });
                });
            })
            .catch(error => console.error('Error al obtener estudiantes del grupo:', error));
    }

    // Inicializar la lista de estudiantes en el grupo
    updateGroupStudents();

    // Evento de búsqueda de estudiantes
    searchInput.addEventListener('input', function() {
        const query = searchInput.value;

        // Realizar petición al servidor para buscar estudiantes
        fetch(`../php/buscar-estudiantes.php?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                studentList.innerHTML = '';

                if (data.length > 0) {
                    data.forEach(student => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${student.nombre} ${student.apellido} - Cédula: ${student.cedula}`;
                        listItem.dataset.id = student.id;
                        listItem.addEventListener('click', function() {
                            if (!groupStudentList.querySelector(`tr[data-id="${student.id}"]`)) {
                                const row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${student.nombre} ${student.apellido}</td>
                                    <td>${student.cedula}</td>
                                    <td><button class="delete-student" data-id="${student.id}">Eliminar</button></td>
                                `;
                                groupStudentList.appendChild(row);

                                // Agregar evento al botón de eliminar
                                row.querySelector('.delete-student').addEventListener('click', function() {
                                    const estudianteId = this.dataset.id;
                                    fetch('../php/modificar-grupo.php', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            grupoId: grupoId,
                                            estudianteId: estudianteId,
                                            action: 'remove' // Indica que se quiere eliminar
                                        })
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            this.closest('tr').remove();
                                        } else {
                                            alert('Error al eliminar el estudiante.');
                                        }
                                    })
                                    .catch(error => console.error('Error al eliminar estudiante:', error));
                                });
                            }
                        });
                        studentList.appendChild(listItem);
                    });
                } else {
                    studentList.innerHTML = '<li>No se encontraron estudiantes.</li>';
                }
            })
            .catch(error => console.error('Error al buscar estudiantes:', error));
    });

    // Evento de guardar cambios
    saveButton.addEventListener('click', function() {
        const estudiantesIds = Array.from(groupStudentList.querySelectorAll('tr')).map(row => row.querySelector('.delete-student').dataset.id);
        
        if (estudiantesIds.length > 0) {
            fetch('../php/modificar-grupo.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    grupoId: grupoId,
                    estudiantes: estudiantesIds,
                    action: 'save' // Indica que se quiere guardar
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cambios guardados exitosamente.');
                } else {
                    alert('Error al guardar los cambios.');
                }
            })
            .catch(error => console.error('Error al guardar los cambios:', error));
        } else {
            alert('No hay estudiantes en el grupo para guardar.');
        }
    });
});
