document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cedula = urlParams.get('cedula');
    if (cedula) {
        fetchStudentData(cedula);
    }

    const form = document.getElementById('edit-student-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        updateStudentData();
    });
});

function fetchStudentData(cedula) {
    fetch(`../php/obtener-estudiante.php?cedula=${cedula}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(student => {
            if (Object.keys(student).length === 0) {
                alert('Estudiante no encontrado.');
                return;
            }
            document.getElementById('cedula').value = student.cedula;
            document.getElementById('nombre').value = student.nombre;
            document.getElementById('apellido').value = student.apellido;
            document.getElementById('email').value = student.email;
            document.getElementById('telefono').value = student.telefono;
        })
        .catch(error => console.error('Error fetching student data:', error));
}



function updateStudentData() {
    const cedula = document.getElementById('cedula').value;
    const studentData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };

    fetch(`../php/actualizar-estudiante.php?cedula=${cedula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = 'gestionar-estudiantes.html';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error updating student data:', error));
}
