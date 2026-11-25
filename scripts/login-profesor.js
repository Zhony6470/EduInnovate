document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", handleLogin);

    function handleLogin(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        // Simular la validación del inicio de sesión
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Aquí podrías agregar la lógica para validar el usuario con tu base de datos
        // Simulamos una validación exitosa
        if (email === "profesor@ejemplo.com" && password === "contraseña") {
            window.location.href = "home-profesor.html"; // Redirigir a la página de inicio del profesor
        } else {
            alert("Correo electrónico o contraseña incorrectos.");
        }
    }
});
