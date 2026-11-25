document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#register-student-form');
    const messageDiv = document.querySelector('#message');

    // Manejar el envío del formulario
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        const formData = new FormData(registerForm);

        fetch('../php/registro-estudiante.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            messageDiv.textContent = data;
            messageDiv.style.display = 'block';

            // Redirigir a la página de gestionar estudiantes después de un breve retraso
            if (data.includes("registrado exitosamente")) {
                setTimeout(function() {
                    window.location.href = 'gestionar-estudiantes.html';
                }, 2000); // Retraso de 2 segundos
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
