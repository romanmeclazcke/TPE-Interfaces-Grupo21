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
const fontToLoad = '20px "Press Start 2P"';
//Promesa para que la fuente del timer cargue correctamente
document.fonts.load(fontToLoad)
    .then(() => {
        console.log('Fuente cargada correctamente');
    })
    .catch((error) => {
        console.error('Error al cargar la fuente:', error);
    })
    .finally(() => {
        document.querySelector("#start-button").addEventListener("click", start);
    });

let canvas = document.getElementById('canva')
let ctx = canvas.getContext('2d')

const backgroundImage = new Image();
backgroundImage.src = './images/gotham.jpg';

canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mousemove', onMouseMove);

const jugadores = {
    j1: "Jugador 1",
    j2: "Jugador 2"
};
const posBotonRestartX = canvas.width / 2 + 65;
const posBotonRestartY = 15;
const botonRestartWidth = 30;
const botonRestartHeight = 30;

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
let existeGanador = null; //variable para verificar si existe un ganador
let contadorFichasSoltadas = 0
let empate = false;

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
    coordenadasUltimaFichaSeleccionada = null;
}

function start() {
    initializeGameVariables();
    canvas.style.display = "block";
    document.querySelector(".connect-four-options").style.display = "none";
    document.querySelector(".start-button").style.visibility = "hidden";
    turno = Math.random() < 0.5 ? jugadores.j1 : jugadores.j2;
    drawCanvas();
    iniciarTimer();
}

function drawCanvas() {
    //Utiliza un metodo que devuelve una promesa para devolver imagen de fondo
    loadImage(backgroundImage.src)
        .then((backgroundImage) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

            crearFichas();
            tablero.drawFondo();
            dibujarTurno();
            dibujarBotonRestart();
            dibujarFichas();
            tablero.draw();
            mostrarGanador();
            mostrarEmpate();
        })
        .catch((error) => {
            console.error('Error loading image:', error);
        });
}

function redibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    tablero.drawFondo();
    dibujarTurno();
    dibujarBotonRestart();
    mostrarTiempoRestante(tiempoLimite);
    dibujarFichas(); //Se vuelven a dibujar las fichas
    tablero.draw(); //Se vuelve a dibujar el tablero
    tablero.drawHints();
    mostrarGanador();
    mostrarEmpate();
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

function obtenerFichaSeleccionada(posicionXMouse, posicionYMouse) {
    let fichas = turno == jugadores.j1 ? fichasJugador1 : fichasJugador2;//retorno las fichas del jugador de turno (si el jugador es j1, retorno sus fichas, sino retorno las de j2)

    for (let ficha of fichas) { //recorro sus fichas y miro si alguna de las suyas esta selecionada
        if (ficha.estaSeleccionada(posicionXMouse, posicionYMouse) && ficha.getFueMovida() == false) { //revisar que error hay (l;a fiucha se movio pero deja moverla igual)
            return ficha;
        }
    }
    return null; // Si no encontre ninguna ficha retorno null
}

function onMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isMouseEnBotonReiniciar(x, y)) { //si esta dentro del boton reiniciar reinicio el juego
        reiniciarJuego();
        return;
    }
    if (existeGanador == null && empate == false) { //solo  se puede mover fichas si no hay ganador
        ultimaFichaClikeada = obtenerFichaSeleccionada(x, y); //obtengo la ficha seleccionada
        if (ultimaFichaClikeada != null) {
            coordenadasUltimaFichaSeleccionada = ultimaFichaClikeada.getPosicion();

            tablero.mostrarHints();
            redibujar();
        }
    }
}

function onMouseMove(e) {
    if (ultimaFichaClikeada != null) {
        const rect = canvas.getBoundingClientRect(); // Obtener la posición del canvas
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        checkearZonaProhibida(mouseX, mouseY) //si esta en zona de tablero pongo el cursor en forma de cruz
        ultimaFichaClikeada.setearPosicion(mouseX, mouseY); //voy moviendo la posicion de la ficha
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
                    let numeroFila = tablero.obtenerFilaDisponibleEnColumna(numeroColumna);
                    let cordenadasHint = tablero.obtenerHint(numeroColumna).getPosicion(); //obtengo las cordenadas de la hint donde solte la ficha
                    ultimaFichaClikeada.setearPosicion(cordenadasHint.x, cordenadasHint.y); //seteo a la ficha en las cordenadas de la hint para comenzar su animacion
                    ultimaFichaClikeada.animarCaida(casilla);
                    casilla.setearFicha(ultimaFichaClikeada);
                    ultimaFichaClikeada.setFueMovida(); //seteo que fue movida para no permitir volver a usarla
                    redibujar();
                    if (tablero.existeGanador(numeroColumna, numeroFila, turno)) {
                        existeGanador = turno;
                        mostrarGanador();
                    } else {
                        contadorFichasSoltadas++;  // Incrementar el contador después de verificar al ganador
                        if (contadorFichasSoltadas === totalFichasPorJugador * 2) { // Revisar si se alcanzó el límite de fichas
                            empate = true;
                            mostrarEmpate();
                        }
                    }
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

function isMouseEnBotonReiniciar(mouseX, mouseY) {
    return mouseX >= posBotonRestartX &&
        mouseX <= posBotonRestartX + botonRestartWidth &&
        mouseY >= posBotonRestartY &&
        mouseY <= posBotonRestartY + botonRestartHeight;
}


function cambiarTurno() {
    turno = (turno === jugadores.j1) ? jugadores.j2 : jugadores.j1
    redibujar();
}

function reiniciarJuego() { //reinicio el juego
    existeGanador = null
    empate = false
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

        redibujar();

        if (tiempoLimite <= 0) {
            clearInterval(intervalo);
            reiniciarJuego();
            alert("¡Tiempo agotado! El juego ha terminado.");
        }
    }, 1000);
}

function dibujarTurno() { //dibuho el turno solo si no hay ganador
    if (existeGanador == null) {
        const esJugador1 = (turno === jugadores.j1);// Determina la posicion en funcion del jugador
        const tamanioTablero = dimensionTablero;
        const flechaX = esJugador1 ? 60 : canvas.width - 60; // Posicion de la flecha en x
        const flechaY = tamanioTablero <= 5 ? 160 : 40; // Posicion de la flecha en y

        // Dibujar flecha
        ctx.beginPath();
        ctx.moveTo(flechaX - 15, flechaY);
        ctx.lineTo(flechaX + 15, flechaY);
        ctx.lineTo(flechaX, flechaY + 30);
        ctx.closePath();
        ctx.fillStyle = '#FA7800'; //Color acento
        ctx.fill();
    }
}

//Funcion que dibuja icono del boton restart
function dibujarBotonRestart() {
    ctx.save();

    let restartIcon = new Image();
    restartIcon.src = './images/white-restart-icon.png';

    ctx.drawImage(restartIcon, posBotonRestartX, posBotonRestartY, 30, 30);
}

function mostrarGanador() {
    if (existeGanador != null) {
        clearInterval(intervalo);
        const texto = `Ganador: ${existeGanador}!`;
        const bannerHeight = 50;
        ctx.fillStyle = '#FA7800'; // Cambia el color del texto al acento
        ctx.font = fontToLoad;
        ctx.textAlign = 'center';
        const centerX = canvas.width / 2;
        const centerY = bannerHeight * 1.5; // Centra el texto verticalmente en el área del banner
        ctx.fillText(texto, centerX, centerY);
    }
}

function mostrarEmpate() {
    if (empate == true) {
        clearInterval(intervalo);
        const texto = `Empate!`;
        const bannerHeight = 50;
        ctx.fillStyle = '#FA7800'; // Cambia el color del texto al acento
        ctx.font = fontToLoad;
        ctx.textAlign = 'center';

        const centerX = canvas.width / 2;
        const centerY = bannerHeight * 1.5; // Centra el texto verticalmente en el área del banner
        ctx.fillText(texto, centerX, centerY);
    }
}

function mostrarTiempoRestante(tiempo) {
    const texto = `${tiempo}`;
    ctx.fillStyle = '#FA7800';
    ctx.font = fontToLoad;
    ctx.textAlign = 'center';

    const centerX = canvas.width / 2;
    const centerY = 40;

    ctx.fillText(texto, centerX, centerY);
}

function checkearZonaProhibida(x, y) { //checkea si esta en zona de tablero
    if (tablero.esZonaProhibida(x, y)) { // si esta dentro pongo el cursor en not-allowed 
        canvas.style.cursor = "not-allowed";
    } else {
        canvas.style.cursor = "pointer"; //si esta fuera lo dejo en pointer(agarrando ficha)
    }
}

// Funcion para cargar una imagen y retornar una promesa
function loadImage(src) {
    return new Promise((resolve, reject) => {
        backgroundImage.onload = () => resolve(backgroundImage);
        backgroundImage.onerror = reject;
        backgroundImage.src = src;
    });
}