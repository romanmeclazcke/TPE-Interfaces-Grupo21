document.getElementById('togglePassword').addEventListener('click', togglePassword);

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