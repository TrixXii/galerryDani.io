document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        var password = document.getElementById("floatingPassword").value; // Obtener el valor de la contraseña

        // Verificar si la contraseña coincide (en este caso, la contraseña es "aaaaa")
        if (password === "aaaaa") {
            // Redirigir a la otra página
            window.location.href = "galeria.html";
        } else {
            // Mostrar un mensaje de error o tomar otras acciones si la contraseña no coincide
            alert("Contraseña incorrecta. Inténtalo de nuevo.");
        }
    });
});