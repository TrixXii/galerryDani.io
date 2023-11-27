document.addEventListener('DOMContentLoaded', function () {
    // Verificar si la cookie de autenticación está presente
    var hasAuthentication = document.cookie.indexOf('authenticated=true') !== -1;
    if (!hasAuthentication) {
        window.location.href = 'index.html';
    }
});

function mostrarGaleria() {
    document.getElementById('galeria').style.display = 'grid';
    document.getElementById('abaut').style.display = 'none';
}

function mostrarAbaut() {
    document.getElementById('galeria').style.display = 'none';
    document.getElementById('abaut').style.display = 'grid';
}

function mostrarFormularioCorreo() {
    // Mostrar el modal del formulario de correo
    var formularioCorreoModal = new bootstrap.Modal(document.getElementById('formularioCorreoModal'));
    formularioCorreoModal.show();
}



fetch('/img/imagenes.json')
    .then(response => response.json())
    .then(data => {
        const galeriaSection = document.getElementById('galeria');

        data.forEach((imagen, index) => {
            // Crear un nuevo elemento de imagen para la galería
            const imgElement = document.createElement('img');
            imgElement.src = imagen.url;
            imgElement.alt = 'Imagen de la galería';
            imgElement.className = 'card-img-top';
            // Establecer el estilo CSS para enfocar en la parte superior de la imagen
            if (index === 2 || index === 3) {
                imgElement.style.objectPosition = 'center 10%';
            }

            // Agregar el evento de clic para abrir el modal con la imagen
            imgElement.addEventListener('click', function () {
                document.getElementById('imagenModalSrc').src = imagen.url;
                new bootstrap.Modal(document.getElementById('imagenModal')).show();
            });

            // Crear un nuevo elemento de tarjeta para la galería
            const cardElement = document.createElement('div');
            cardElement.className = 'card m-3 ';

            cardElement.appendChild(imgElement);

            // Agregar la tarjeta a la sección de galería
            galeriaSection.appendChild(cardElement);
        });

    })
    .catch(error => console.error('Error al cargar imagenes.json', error));


//  // Agregar la clase especial para las tarjetas 3 y 4
//  if (index === 2 || index === 3) {
//     cardElement.classList.add('top-background');
// }