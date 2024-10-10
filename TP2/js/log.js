document.getElementById('togglePassword').addEventListener('click', togglePassword);
document.getElementById('boton-registro').addEventListener('click', showCargando);

function togglePassword() {
    const contraseña = document.getElementById('contraseña');
    const imagen = document.getElementById('ojo-password');

    if (contraseña.type === 'password') {
        contraseña.type = 'text';
        imagen.src = 'images/ojo contraseña cerrado.png';
    } else {
        contraseña.type = 'password';
        imagen.src = 'images/ojo contraseña.png';
    }
}

function showCargando() {
    let button = document.getElementById('boton-registro');
    let texto = button.querySelector('.texto-boton');
    button.disabled = true;
    button.classList.add('cargando');

    setTimeout(function() {
        button.classList.remove('cargando');
        button.classList.add('exito');

        texto.textContent = "¡Registro exitoso! Redirigiendo...";
        button.disabled = false;

        setTimeout(function() {
            window.location.href = 'home.html';
        }, 3000);
    }, 4000);
}