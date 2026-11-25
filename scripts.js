function redirectToRolePage() {
    const roles = document.getElementsByName('role');
    let selectedRole;
    for (const role of roles) {
        if (role.checked) {
            selectedRole = role.value;
            break;
        }
    }
    if (selectedRole) {
        if (selectedRole === 'coordinador') {
            window.location.href = 'login/coordinador.html'; // Página específica para coordinador
        } else {
            window.location.href = 'login/login-' + selectedRole + '.html'; // Página para estudiante o profesor
        }
    } else {
        alert('Por favor, seleccione un rol.');
    }
}


document.getElementById("registro-form").addEventListener("submit", function(event) {
    // Evitar el envío del formulario si hay errores
    let password = document.getElementById("password").value.trim();
    let confirmPassword = document.getElementById("confirm-password").value.trim();

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden. Por favor, verifícalas.");
        event.preventDefault(); // Evitar el envío del formulario
        return;
    }

    // Si las validaciones pasan, se enviará el formulario normalmente
});


// Función para procesar el registro y mostrar mensajes
function procesarRegistro(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    
    // Mostrar mensaje de confirmación
    alert("¡Has sido registrado exitosamente!");

    // Redirigir a la página de inicio de sesión después de un breve retraso
    setTimeout(function() {
        window.location.href = "../login/login-coordinador.html";
    }, 1000); // 1000 milisegundos = 1 segundo
}

// Función para validar el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Obtener los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Enviar datos al servidor
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    fetch('../php/login_coordinador.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        // Procesar la respuesta del servidor
        document.open();
        document.write(result);
        document.close();
    })
    .catch(error => console.error('Error:', error));
});
