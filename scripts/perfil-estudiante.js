document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-profile-form');
    const updateForm = document.getElementById('update-profile-form');

    // Buscar perfil
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        buscarPerfil();
    });

    // Actualizar datos
    updateForm.addEventListener('submit', event => {
        event.preventDefault();
        actualizarDatos();
    });
});

function buscarPerfil() {
    const cedula = document.getElementById('cedula').value;
    const formData = new FormData();
    formData.append('cedula', cedula);
    formData.append('accion', 'buscar');

    fetch('../php/perfil-estudiante.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('apellido').value = data.apellido;
            document.getElementById('email').value = data.email;
            document.getElementById('telefono').value = data.telefono;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function actualizarDatos() {
    const cedula = document.getElementById('cedula').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-new-password').value;

    if (newPassword && newPassword !== confirmNewPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const formData = new FormData();
    formData.append('cedula', cedula);
    formData.append('nombre', nombre);
    formData.append('apellido', apellido);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('new-password', newPassword);
    formData.append('accion', 'actualizar_datos');

    fetch('../php/perfil-estudiante.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.success);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
