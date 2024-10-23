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

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);

let dimensionTablero = 4//revisir desde un input 
let totalFichasPorJugador = (dimensionTablero+2)*( dimensionTablero+3)/2
let tablero = new Tablero(dimensionTablero, ctx)
let jugador1 = "j1"
let jugador2 = "j2"
let fichasJugador1 = []
let fichasJugador2 = []
let turno = ""
let ultimaFichaClikeada = null;
let tiempoLimite= 180; //segundos

start();

function start(){
    turno = "j1"
    drawCanvas();
}

function drawCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    tablero.draw();
    crearFichas();
    dibujarFichas();
    iniciarTimer();
}

function redibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //borro todo el canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); //pinto todo el fondo de rojo
    tablero.draw(); // vuelvo a dibujar el tablero
    dibujarFichas(); // vuelvo a dibujar todas las fichas
}


function dibujarFichas() { //dibujo todas las fichas
    for (ficha of fichasJugador1) {
        ficha.draw();
    }

    for (ficha of fichasJugador2) {
        ficha.draw();
    }
}

function crearFichas() {
    let espacioEntreFichas = 10; // Espacio entre cada ficha en la columna
    let xJugador1 = 60; // Posición x fija para el jugador 1 (a la izquierda)
    let xJugador2 = canvas.width - 60; // Posición x fija para el jugador 2 (a la derecha)
    
    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador1 = canvas.height - (50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador1.push(new Ficha(ctx, 'red', jugador1, xJugador1, yJugador1, 25, './images/batman.jpg'));
    }


    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador2 = canvas.height -(50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador2.push(new Ficha(ctx, 'blue', jugador2, xJugador2, yJugador2, 25, './images/joker.webp'));
    }
}


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);//borra todo del canvas
    drawCanvas(); //redibujo todo el canvas
}



function onMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    ultimaFichaClikeada = obtenerFichaSeleccionada(x, y);
}

function obtenerFichaSeleccionada(posicionXMouse, posicionYMouse) {
    let fichas = turno === "j2" ? fichasJugador1 : fichasJugador2;//retorno las fichas del jugador de turno (si el jugador es j1, retorno sus fichas, sino retorno las de j2)

    for (let ficha of fichas) { //recorro sus fichas y miro si alguna de las suyas esta selecionada
        if (ficha.estaSeleccionada(posicionXMouse, posicionYMouse)&& ficha.getFueMovida()==false) { //revisar que error hay (l;a fiucha se movio pero deja moverla igual)
            console.log(ficha)
            return ficha;
        }
    }
    return null; // Si no encontre ninguna ficha retorno null
}


function onMouseMove(e){
    if(ultimaFichaClikeada!=null){
        const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;  
        ultimaFichaClikeada.setearPosicion(mouseX,mouseY);
        redibujar();

    }
}


function onMouseUp(e){
    ultimaFichaClikeada = null;
    if(ultimaFichaClikeada!=null){
        this.ultimaFichaClikeada.setFueMovida(); //revisar esto, cuando la ficha se seteo en un lugar no permitir volver a moverla
    }
    cambiarTurno(); //verificar que la ficha se haya seteado en un lugar y recien ahi cambiar el turno
}

function cambiarTurno(){
    if(turno=="j1"){
        turno= "j2"
    }else{
        turno="j1"
    }
}

function reiniciarJuego(){ //reinicio el juego
    fichasJugador1=[]
    fichasJugador2=[]
    ultimaFichaClikeada=null;
    tablero = new Tablero(dimensionTablero)

    start();
}

function iniciarTimer() { //timer para ver cuando termina el juego y resetearlo en caso de que el tiempo haya llegado a su limite
    tiempoLimite=180; //reseteo el tiempo limite
    let intervalo = setInterval(() => {
        tiempoLimite--;
        console.log("Tiempo restante: " + tiempoLimite)
        if (tiempoLimite <= 0) {
            clearInterval(intervalo);
            reiniciarJuego();
            alert("¡Tiempo agotado! El juego ha terminado.");
        }
    }, 1000);
}