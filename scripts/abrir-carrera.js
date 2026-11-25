document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-student');
    const studentList = document.getElementById('student-list');
    const selectedStudentList = document.getElementById('selected-student-list');
    const selectedStudents = new Set();
    const form = document.getElementById('open-career-form');
    const message = document.getElementById('message');
    
    // Evento de búsqueda de estudiantes
    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();

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
                            if (!selectedStudents.has(student.id)) {
                                selectedStudents.add(student.id);
                                updateSelectedStudents();
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

    function updateSelectedStudents() {
        selectedStudentList.innerHTML = '';
        
        selectedStudents.forEach(id => {
            fetch(`../php/get-estudiante.php?id=${id}`)
                .then(response => response.json())
                .then(student => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${student.nombre} ${student.apellido} - Cédula: ${student.cedula}`;
                    listItem.addEventListener('click', function() {
                        selectedStudents.delete(id);
                        updateSelectedStudents();
                    });
                    selectedStudentList.appendChild(listItem);
                })
                .catch(error => console.error('Error al obtener datos del estudiante:', error));
        });
    }

    // Evento de envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const carreraNombre = document.getElementById('carrera-nombre').value.trim();
        
        if (carreraNombre && selectedStudents.size > 0) {
            // Enviar los datos al servidor
            fetch('../php/crear-carrera.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    carreraNombre: carreraNombre,
                    estudiantes: Array.from(selectedStudents)
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    message.style.display = 'block';
                    form.reset();
                    selectedStudents.clear();
                    updateSelectedStudents();
                } else {
                    alert('Error al crear la carrera. Inténtelo de nuevo.');
                }
            })
            .catch(error => console.error('Error al crear la carrera:', error));
        } else {
            alert('Por favor, ingrese el nombre de la carrera y seleccione al menos un estudiante.');
        }
    });
});
