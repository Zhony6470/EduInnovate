$(document).ready(function() {
    const messageContainer = $("#message-container");
    const messageForm = $("#message-form");
    const messageInput = $("#message-input");
    const fileInput = $("#file-input");
    const fileNameDisplay = $("#file-name");
    const attachButton = $("#attach-button");
    const cancelButton = $("#cancel-button");

    const cursoId = new URLSearchParams(window.location.search).get('cursoId');
    const pollingInterval = 2000;

    let isAtBottom = true;

    function scrollToBottom(force = false) {
        if (force || isAtBottom) {
            messageContainer.scrollTop(messageContainer[0].scrollHeight);
        }
    }

    function notificarNuevoMensaje() {
        localStorage.setItem('nuevoMensaje', 'true');
    }

    function cargarMensajes() {
        $.post('../php/chat-estudiante.php', { accion: 'cargar_mensajes', curso_id: cursoId }, function(mensajes) {
            console.log('Mensajes cargados:', mensajes);
            const previousScrollHeight = messageContainer[0].scrollHeight;
            messageContainer.empty();
            mensajes.forEach(mensaje => {
                const messageElement = $(`
                    <div class="message ${mensaje.usuario_id === 'user' ? 'user' : ''}">
                        <div><strong>${mensaje.nombre_remitente}:</strong></div>
                        <div class="message-content">${mensaje.mensaje}</div>
                        <div class="message-time">${mensaje.fecha_hora}</div>
                        ${mensaje.archivo ? `
                            <div class="message-attachment">
                                <i class="fas fa-file-download"></i>
                                <a href="../uploads/${mensaje.archivo}" download>Descargar archivo: ${mensaje.archivo}</a>
                            </div>
                        ` : ''}
                        ${mensaje.can_delete ? `
                            <button class="delete-button" data-id="${mensaje.id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        ` : ''}
                    </div>
                `);
                messageContainer.append(messageElement);
            });
            const newScrollHeight = messageContainer[0].scrollHeight;
            if (newScrollHeight > previousScrollHeight) {
                scrollToBottom();
            }
            // Notificar que hay nuevos mensajes
        notificarNuevoMensaje();
    }, 'json').fail(function(error) {
        console.error('Error cargando mensajes:', error);
    });
}
// Ejecutar la función notificarNuevoMensaje cuando sea necesario
cargarMensajes();

    messageForm.on("submit", function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        formData.append('accion', 'enviar_mensaje');
        formData.append('curso_id', cursoId);
        formData.append('mensaje', messageInput.val());

        if (fileInput[0].files.length > 0) {
            formData.append('archivo', fileInput[0].files[0]);
        }

        $.ajax({
            url: '../php/chat-estudiante.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(result) {
                console.log('Resultado del envío de mensaje:', result);
                if (result.success) {
                    messageInput.val('');
                    fileInput.val('');
                    fileNameDisplay.text('');
                    attachButton.show();
                    cancelButton.hide();
                    cargarMensajes();
                    scrollToBottom(true); // Forzar desplazamiento al final al enviar un nuevo mensaje
                } else {
                    console.error('Error enviando mensaje:', result.error);
                }
            },
            error: function(error) {
                console.error('Error enviando mensaje:', error);
            }
        });
    });

    attachButton.on("click", function() {
        fileInput.click();
    });

    fileInput.on("change", function() {
        if (fileInput[0].files.length > 0) {
            fileNameDisplay.text(fileInput[0].files[0].name);
            attachButton.hide();
            cancelButton.show();
        }
    });

    cancelButton.on("click", function() {
        fileInput.val('');
        fileNameDisplay.text('');
        attachButton.show();
        cancelButton.hide();
    });

    messageContainer.on("click", ".delete-button", function() {
        const mensajeId = $(this).data("id");
        console.log('Intentando eliminar mensaje con ID:', mensajeId);
        $.post('../php/chat-estudiante.php', { accion: 'eliminar_mensaje', mensaje_id: mensajeId }, function(result) {
            console.log('Resultado de la eliminación del mensaje:', result);
            if (result.success) {
                cargarMensajes();
            } else {
                console.error('Error eliminando mensaje:', result.error);
            }
        }, 'json').fail(function(error) {
            console.error('Error eliminando mensaje:', error);
        });
    });

    messageContainer.on("scroll", function() {
        isAtBottom = messageContainer[0].scrollHeight - messageContainer.scrollTop() === messageContainer.outerHeight();
    });

    cargarMensajes();
    setInterval(cargarMensajes, pollingInterval);
});

