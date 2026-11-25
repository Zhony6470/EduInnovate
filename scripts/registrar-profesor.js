document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('#register-professor-form');
    const messageDiv = document.querySelector('#message');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        const formData = new FormData(registerForm);

        fetch('../php/registro-profesor.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            messageDiv.textContent = data;
            messageDiv.style.display = 'block';

            // Redirigir a la página de gestionar profesores después de un breve retraso
            if (data.includes("registrado")) {
                setTimeout(function() {
                    window.location.href = 'gestionar-profesores.html';
                }, 2000); // Retraso de 2 segundos
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
