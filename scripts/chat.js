document.addEventListener("DOMContentLoaded", () => {
    const messageContainer = document.getElementById("message-container");
    const messageForm = document.getElementById("message-form");
    const messageInput = document.getElementById("message-input");
    const fileInput = document.getElementById("file-input");
    const fileNameDisplay = document.getElementById("file-name");
    const attachButton = document.getElementById("attach-button");
    const cancelButton = document.getElementById("cancel-button");

    const cursoId = new URLSearchParams(window.location.search).get('cursoId');
    let pollingInterval = 1000; // Intervalo de 1 segundo para hacer polling

    let isAtBottom = true; // Controla si el contenedor está en el fondo

    function scrollToBottom() {
        if (isAtBottom) {
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }

    function notificarNuevoMensaje() {
        localStorage.setItem('nuevoMensaje', 'true');
    }

    function cargarMensajes() {
        fetch('../php/chat.php', {
            method: 'POST',
            body: new URLSearchParams({ accion: 'cargar_mensajes', curso_id: cursoId })
        })
        .then(response => response.json())
        .then(mensajes => {
            console.log('Mensajes cargados:', mensajes); // Depuración
            messageContainer.innerHTML = '';
            mensajes.forEach(mensaje => {
                const messageElement = document.createElement("div");
                messageElement.className = `message ${mensaje.usuario_id === 'user' ? 'user' : ''}`;
                messageElement.innerHTML = `
                    <div><strong>${mensaje.nombre_remitente}:</strong></div>
                    <div class="message-content">${mensaje.mensaje}</div>
                    <div class="message-time">${mensaje.fecha_hora}</div>
                    ${mensaje.archivo ? `
                        <div class="message-attachment">
                            <i class="fas fa-file-download"></i>
                            <a href="../uploads/${mensaje.archivo}" download>Descargar archivo: ${mensaje.archivo}</a>
                        </div>
                    ` : ''}
                    <button class="delete-button" onclick="eliminarMensaje(${mensaje.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                `;
                messageContainer.appendChild(messageElement);
            });
            scrollToBottom(); // Desplazar al fondo si es necesario
        })
        notificarNuevoMensaje();
    }

    cargarMensajes();

    messageForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('accion', 'enviar_mensaje');
        formData.append('curso_id', cursoId);
        formData.append('mensaje', messageInput.value);
        if (fileInput.files.length > 0) {
            formData.append('archivo', fileInput.files[0]);
        }

        fetch('../php/chat.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(result => {
            console.log('Resultado del envío de mensaje:', result); // Depuración
            if (result.success) {
                messageInput.value = '';
                fileInput.value = '';
                fileNameDisplay.textContent = '';
                attachButton.style.display = 'inline-block';
                cancelButton.style.display = 'none';
                cargarMensajes(); // Recarga los mensajes automáticamente
            } else {
                console.error('Error enviando mensaje:', result.error);
            }
        })
        .catch(error => console.error('Error enviando mensaje:', error));
    });

    attachButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            fileNameDisplay.textContent = fileInput.files[0].name;
            attachButton.style.display = 'none';
            cancelButton.style.display = 'inline-block';
        }
    });

    cancelButton.addEventListener("click", () => {
        fileInput.value = '';
        fileNameDisplay.textContent = '';
        attachButton.style.display = 'inline-block';
        cancelButton.style.display = 'none';
    });

    messageContainer.addEventListener('scroll', () => {
        isAtBottom = messageContainer.scrollHeight - messageContainer.scrollTop === messageContainer.clientHeight;
    });

    window.eliminarMensaje = function(mensajeId) {
        fetch('../php/chat.php', {
            method: 'POST',
            body: new URLSearchParams({ accion: 'eliminar_mensaje', mensaje_id: mensajeId })
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                cargarMensajes();
            } else {
                console.error('Error eliminando mensaje:', result.error);
            }
        })
        .catch(error => console.error('Error eliminando mensaje:', error));
    };

    cargarMensajes();
    setInterval(cargarMensajes, pollingInterval); // Llama a cargarMensajes cada 1 segundo
});
