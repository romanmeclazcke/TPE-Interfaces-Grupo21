//Menu hamburguesa
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

//Juego
document.querySelector("#start-button").addEventListener("click", start);

let canvas = document.getElementById('canva')
let ctx = canvas.getContext('2d')

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);

const jugadores = {
    j1: "Jugador 1",
    j2: "Jugador 2"
};

let dimensionTablero;
let totalFichasPorJugador;
let tablero;
let rutaImagenFichaJugador1;
let rutaImagenFichaJugador2;
let fichasJugador1;
let fichasJugador2;
let turno;
let ultimaFichaClikeada;
let tiempoLimite;
let intervalo;
let coordenadasUltimaFichaSeleccionada;


function initializeGameVariables() {
    const tamanioTablero = document.querySelector('input[name="tamanioTablero"]:checked');
    const rutaImagenFichaJugador1FromDom = document.querySelector('input[name="tipoFichaJugador1"]:checked');
    const rutaImagenFichaJugador2FromDom = document.querySelector('input[name="tipoFichaJugador2"]:checked');

    dimensionTablero = Number(tamanioTablero.value) ?? 4;
    rutaImagenFichaJugador1 = rutaImagenFichaJugador1FromDom.value;
    rutaImagenFichaJugador2 = rutaImagenFichaJugador2FromDom.value;

    totalFichasPorJugador = (dimensionTablero + 2) * (dimensionTablero + 3) / 2;
    tablero = new Tablero(dimensionTablero, ctx);
    fichasJugador1 = [];
    fichasJugador2 = [];
    turno = "";
    ultimaFichaClikeada = null;
    tiempoLimite = 180; //segundos
    intervalo = 0;
    coordenadasUltimaFichaSeleccionada = null;
}

function start() {
    initializeGameVariables();
    canvas.style.display = "block";
    document.querySelector(".connect-four-options").style.display = "none";
    turno = Math.random() < 0.5 ? "j1" : "j2";
    drawCanvas();
    iniciarTimer();
}

function drawCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    crearFichas();
    tablero.drawFondo();
    dibujarTurno();
    dibujarFichas();
    tablero.draw();
}

function redibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //borro todo el canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height); //pinto todo el fondo de rojo
    tablero.drawFondo();
    dibujarTurno();
    dibujarFichas(); // vuelvo a dibujar todas las fichas
    tablero.draw(); // vuelvo a dibujar el tablero
    tablero.drawHints();
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
    let radioFichas = 20

    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador1 = canvas.height - (50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador1.push(new Ficha(ctx, 'red', jugadores.j1, xJugador1, yJugador1, radioFichas, rutaImagenFichaJugador1));
    }

    for (let i = 0; i < totalFichasPorJugador; i++) {
        let yJugador2 = canvas.height - (50 + i * espacioEntreFichas); // Espacio entre cada ficha
        fichasJugador2.push(new Ficha(ctx, 'blue', jugadores.j2, xJugador2, yJugador2, radioFichas, rutaImagenFichaJugador2));
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
        coordenadasUltimaFichaSeleccionada = ultimaFichaClikeada.getPosicion();

        tablero.mostrarHints();
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
        checkearZonaProhibida(mouseX, mouseY)
        ultimaFichaClikeada.setearPosicion(mouseX, mouseY);
        redibujar();
    }
}


function onMouseUp(e) {
    if (ultimaFichaClikeada != null) {
        let cordenadasUltimaFicha = ultimaFichaClikeada.getPosicion();
        tablero.ocultarHints();//oculto las hists cuando solte la ficha

        if (tablero.esPosicionValida(cordenadasUltimaFicha.x, cordenadasUltimaFicha.y)) {//verifico que solte la ficha en una hit valida
            let numeroColumna = tablero.obtenerColumna(cordenadasUltimaFicha.x, cordenadasUltimaFicha.y);//obtengo el numero de columna donde solte la ficha
            if (numeroColumna != null) {
                let casilla = tablero.obtenerCasilleroPorColumna(numeroColumna); //si obtuve un numero de columna  valido, obtengo la casilla donde puedo va a ir a parar la ficha
                if (casilla != null) {
                    let cordenadasHint = tablero.obtenerHint(numeroColumna).getPosicion(); //obtengo las cordenadas de la hint donde solte la ficha
                    ultimaFichaClikeada.setearPosicion(cordenadasHint.x, cordenadasHint.y); //seteo a la ficha en las cordenadas de la hint para comenzar su animacion
                    animarCaida(ultimaFichaClikeada, casilla);
                    casilla.setearFicha(ultimaFichaClikeada);
                    ultimaFichaClikeada.setFueMovida(); //seteo que fue movida para no permitir volver a usarla
                    redibujar();
                    cambiarTurno();
                } else {
                    ultimaFichaClikeada.setearPosicion(coordenadasUltimaFichaSeleccionada.x, coordenadasUltimaFichaSeleccionada.y);//si no existe una casilla en la columna vuelvo la ficha a su posicion original (pila)
                    redibujar();
                }
            }
        } else {
            ultimaFichaClikeada.setearPosicion(coordenadasUltimaFichaSeleccionada.x, coordenadasUltimaFichaSeleccionada.y);// Si la posición no es válida, restaura la ficha a su posición anterior
            redibujar(); // Redibuja el canvas
        }
        canvas.style.cursor = "default";
    }
    ultimaFichaClikeada = null;
}

function animarCaida(ficha, casilla) {
    const { x: xFinal, y: yFinal } = casilla.getPosicion(); //Posición destino
    const xInicial = ficha.getPosicion().x; //Posición x de la ficha para mantenerla fija en el eje X mientras cae

    let velocidadY = 0;
    const gravedad = 0.6;
    const duracionRebote = 0.3;

    function mover() {
        //Calculo nueva posición en Y
        velocidadY += gravedad;
        let yActual = ficha.getPosicion().y + velocidadY;

        //Rebotar si alcanzó la casilla
        if (yActual >= yFinal + casilla.getTamanio() / 2) {
            yActual = yFinal + casilla.getTamanio() / 2; //Para que la ficha no se pase
            velocidadY *= -duracionRebote; // Simula el rebote

            if (Math.abs(velocidadY) < 0.5) { //Si la velocidad es ínfima, la ficha se dejó de mover (llegó)
                ficha.setearPosicion(xInicial, yFinal + casilla.getTamanio() / 2); // Asegura la posición final exacta

                let cordenadasCasilla = casilla.getPosicion(); //obtengo las cordenadas de la casilla para mover la ficha a esa posicion
                ficha.setearPosicion(cordenadasCasilla.x + casilla.getTamanio() / 2, cordenadasCasilla.y + casilla.getTamanio() / 2) //seteo la ficha en la posicion de la casilla, sumo el tamanio /2 para centarla vertical y horizontalmente

                redibujar(); // Redibuja para actualizar la vista final
                return; // Termina la animación
            }
        }

        ficha.setearPosicion(xInicial, yActual); //Ubica la ficha en la casilla
        redibujar();

        requestAnimationFrame(mover); //Llamado recursivo a la animación hasta que la ficha llegue al destino
    }

    mover();
}

function dibujarTurno() { // TODO -> Estetizarlo mejor
    const texto = `Turno de: ${jugadores[turno]}`;
    ctx.fillStyle = '#022B49';
    ctx.font = '20px "Inconsolata"';

    //Sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;

    ctx.fillText(texto, canvas.width / 6, 30);
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
    if (intervalo) //Corta el intervalo anterior si existe
        clearInterval(intervalo);

    tiempoLimite = 180; //reseteo el tiempo limite

    intervalo = setInterval(() => {
        tiempoLimite--;

        mostrarTiempoRestante(tiempoLimite);

        if (tiempoLimite <= 0) {
            clearInterval(intervalo);
            reiniciarJuego();
            alert("¡Tiempo agotado! El juego ha terminado.");
        }
    }, 1000);
}

function mostrarTiempoRestante(tiempo) { //SOLUCIONAR QUE NO SE SUPERPONGA CON LAS HINTS
    const texto = `Tiempo restante: ${tiempo} segundos`;
    ctx.fillStyle = '#022B49';
    ctx.font = '20px "Inconsolata"';

    //Sombra
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;

    ctx.textAlign = 'center';

    redibujar();
    ctx.fillText(texto, canvas.width - 200, 30);
}

function checkearZonaProhibida(x, y) { //checkea si esta en zona de tablero
    if (tablero.esZonaProhibida(x, y)) { // si esta dentro pongo el cursor en not-allowed 
        canvas.style.cursor = "not-allowed";
    } else {
        canvas.style.cursor = "pointer"; //si esta fuera lo dejo en pointer(agarrando ficha)
    }
}