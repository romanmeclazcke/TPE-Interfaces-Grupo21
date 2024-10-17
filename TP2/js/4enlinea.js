let menu = document.getElementById("menu-hamburguesa");
let btnCerrarMenu = document.getElementById("btn-cerrar-menu");
let btnAbrirMenu = document.getElementById("btn-abrir-menu");

btnAbrirMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.style.display = "block";
});

btnCerrarMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.style.display = "none";
});

let canvas = document.getElementById('canva')
let ctx = canvas.getContext('2d')
let tablero  = new Tablero(4,ctx);

drawCanvas();



function drawCanvas(){
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    tablero.draw();
}


function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);//borra todo del canvas
    drawCanvas(); //redibujo todo el canvas
}

