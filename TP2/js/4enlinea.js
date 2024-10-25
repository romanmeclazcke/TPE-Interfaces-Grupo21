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

let dimensionTablero = 5//revisir desde un input 
let totalFichasPorJugador = (dimensionTablero + 2) * (dimensionTablero + 3) / 2
let tablero = new Tablero(dimensionTablero, ctx)
const jugadores = {
    j1: "Jugador 1",
    j2: "Jugador 2"
};
let fichasJugador1 = []
let fichasJugador2 = []
let turno = ""
let ultimaFichaClikeada = null;
let tiempoLimite = 180; //segundos
let cordenadasUltimaFichaSeleccionada = null;
let hints = [];

start();

function start() {
    turno = Math.random() < 0.5 ? "j1" : "j2";
    hints = tablero.crearHints();
    drawCanvas();
}

function drawCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    crearFichas();
    tablero.drawFondo();
    dibujarTurno();
    dibujarFichas();
    tablero.draw();
    iniciarTimer();
}

function redibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //borro todo el canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); //pinto todo el fondo de rojo
    tablero.drawFondo();
    dibujarTurno();
    dibujarFichas(); // vuelvo a dibujar todas las fichas
    tablero.draw(); // vuelvo a dibujar el tablero
    hints.forEach(hint => hint.draw());
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
    let radioFichas =20
    
    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador1 = canvas.height - (50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador1.push(new Ficha(ctx, 'red', jugadores.j1, xJugador1, yJugador1, radioFichas, './images/batman.jpg'));
    }


    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador2 = canvas.height - (50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador2.push(new Ficha(ctx, 'blue', jugadores.j2, xJugador2, yJugador2, radioFichas, './images/joker.webp'));
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
    if (ultimaFichaClikeada != null) {
        cordenadasUltimaFichaSeleccionada = ultimaFichaClikeada.getPosicion();

        hints.forEach(hint => hint.mostrar());
        redibujar();
    }
}

function obtenerFichaSeleccionada(posicionXMouse, posicionYMouse) {
    let fichas = turno == "j1" ? fichasJugador1 : fichasJugador2;//retorno las fichas del jugador de turno (si el jugador es j1, retorno sus fichas, sino retorno las de j2)

    for (let ficha of fichas) { //recorro sus fichas y miro si alguna de las suyas esta selecionada
        if (ficha.estaSeleccionada(posicionXMouse, posicionYMouse) && ficha.getFueMovida() == false) { //revisar que error hay (l;a fiucha se movio pero deja moverla igual)
            return ficha;
        }
    }
    return null; // Si no encontre ninguna ficha retorno null
}


function onMouseMove(e) {
    if (ultimaFichaClikeada != null) {
        const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        ultimaFichaClikeada.setearPosicion(mouseX, mouseY);
        redibujar();
    }
}


function onMouseUp(e) {
    if (ultimaFichaClikeada != null) {
        let cordenadasUltimaFicha = ultimaFichaClikeada.getPosicion();
        hints.forEach(hint => hint.ocultar());//oculto las hists cuando solte la ficha
        if (tablero.esPosicionValida(cordenadasUltimaFicha.x, cordenadasUltimaFicha.y)) {//verifico que solte la ficha en una hit valida
            let numeroColumna = tablero.obtenerColumna(cordenadasUltimaFicha.x, cordenadasUltimaFicha.y);//obtengo el numero de columna donde solte la ficha
            if(numeroColumna!=null){
                let casilla =tablero.obtenerCasilleroPorColumna(numeroColumna); //si obtuve un numero de columna  valido, obtengo la casilla donde puedo va a ir a parar la ficha
                if(casilla!=null){
                    casilla.setearFicha(ultimaFichaClikeada) //seteo la ficha en la casilla
                    let cordenadasCasilla= casilla.getPosicion(); //obtengo las cordenadas de la casilla para mover la ficha a esa posicion
                    ultimaFichaClikeada.setearPosicion(cordenadasCasilla.x+casilla.getTamanio()/2,cordenadasCasilla.y+casilla.getTamanio()/2) //seteo la ficha en la posicion de la casilla, sumo el tamanio /2 para centarla vertical y horizontalmente
                    ultimaFichaClikeada.setFueMovida(); //seteo que fue movida para no permitir volver a usarla
                    redibujar();
                    cambiarTurno();
                }else{
                    ultimaFichaClikeada.setearPosicion(cordenadasUltimaFichaSeleccionada.x, cordenadasUltimaFichaSeleccionada.y);//si no existe una casilla en la columna vuelvo la ficha a su posicion original (pila)
                    redibujar();
                }
            }
        } else {
            ultimaFichaClikeada.setearPosicion(cordenadasUltimaFichaSeleccionada.x, cordenadasUltimaFichaSeleccionada.y);// Si la posición no es válida, restaura la ficha a su posición anterior
            redibujar(); // Redibuja el canvas
        }
    }
    ultimaFichaClikeada = null;
}

function dibujarTurno() { // TODO -> Estetizarlo mejor
    const texto = `Turno de: ${jugadores[turno]}`;
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(texto, canvas.width / 2, 30);
}

function cambiarTurno() {
    turno = (turno === "j1") ? "j2" : "j1";
    redibujar();
}

function reiniciarJuego() { //reinicio el juego
    fichasJugador1 = []
    fichasJugador2 = []
    ultimaFichaClikeada = null;
    tablero = new Tablero(dimensionTablero, ctx)
    start();
}

function iniciarTimer() { //timer para ver cuando termina el juego y resetearlo en caso de que el tiempo haya llegado a su limite
    tiempoLimite = 180; //reseteo el tiempo limite
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