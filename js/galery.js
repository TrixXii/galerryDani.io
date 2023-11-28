document.addEventListener('DOMContentLoaded', function () {
    // Verificar si la cookie de autenticación está presente
    var hasAuthentication = document.cookie.indexOf('authenticated=true') !== -1;
    if (!hasAuthentication) {
        window.location.href = '../html/index.html';
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



fetch('../img/imagenes.json')
    .then(response => response.json())
    .then(data => {
        const galeriaSection = document.getElementById('galeria');
        const modal = document.getElementById('myModal');
        const modalImage = document.getElementById('modalImage');
        const additionalContent = document.getElementById('additionalContent');

        data.forEach((imagen, index) => {
            // Crear un nuevo elemento de imagen para la galería
            const imgElement = document.createElement('img');
            imgElement.src = imagen.url;
            imgElement.alt = 'Imagen de la galería';
            imgElement.className = 'card-img-top ';
            // Establecer el estilo CSS para enfocar en la parte superior de la imagen
            if (index === 5 || index === 6 || index === 8) {
                imgElement.style.objectPosition = 'center 10%';
            }

         
            
            
            

            // Crear un nuevo elemento de tarjeta para la galería
            const cardElement = document.createElement('div');
            cardElement.className = 'card m-3 animate__animated animate__slideInUp';

            cardElement.addEventListener('click', function () {
                modal.style.display = 'block';
                modalImage.src = imagen.url;

                // Limpiar el contenido adicional antes de agregar nuevo contenido
                additionalContent.innerHTML = '';

                // Recorrer cada elemento del contenido y agregarlo al modal
                for (const key in imagen.content[0]) {
                    if (imagen.content[0].hasOwnProperty(key)) {
                        const contentElement = document.createElement('div');

                        // Verificar si el contenido es una imagen o un video
                        if (imagen.content[0][key].endsWith('.mp4')) {
                            const videoElement = document.createElement('video');
                            videoElement.src = imagen.content[0][key];
                            videoElement.controls = true;
                            videoElement.autoplay = true; // Agrega autoplay
                            videoElement.loop = true;
                            videoElement.className = 'imgC';
                            contentElement.appendChild(videoElement);
                        } else {
                            const imgElement = document.createElement('img');
                            imgElement.src = imagen.content[0][key];
                            imgElement.alt = `Contenido adicional ${key}`;
                            imgElement.className = 'imgC';
                            contentElement.appendChild(imgElement);
                        }

                        additionalContent.appendChild(contentElement);
                    }
                    
                }
            });

            // Cierra el modal al hacer clic fuera de él
            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });

            cardElement.appendChild(imgElement);

            // Agregar la tarjeta a la sección de galería
            galeriaSection.appendChild(cardElement);
        });
    })
    .catch(error => console.error('Error al cargar imagenes.json', error));
