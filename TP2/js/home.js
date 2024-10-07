document.getElementById("loader").style.display = "flex";
let header =document.querySelector  (".header")
let menu = document.getElementById("menu-hamburguesa");
let btnCerrarMenu = document.getElementById("btn-cerrar-menu");
let btnAbrirMenu = document.getElementById("btn-abrir-menu");

menu.style.display = "none";
header.style.display="none";

btnAbrirMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.style.display = "block";
});

btnCerrarMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menu.style.display = "none";
});


let progress = 0;
let barra = document.querySelector('.barra-carga');
let porcentajeCarga = document.getElementById('porcentaje-carga');

let interval = setInterval(() => {
    progress += 10;
    barra.style.width = progress + '%';
    porcentajeCarga.textContent = progress + '%';

    if (progress >= 100) {
        header.style.display="flex"
        document.getElementById("loader").style.display = "none";
        clearInterval(interval); //evito que siga sumando las variable
    }
}, 500);

// Carruseles normales
let carruseles = document.querySelectorAll(".carrusel");
carruseles.forEach((carrusel) => {
    let btnIzq = carrusel.querySelector(".btn-izq");
    let btnDer = carrusel.querySelector(".btn-der");
    let containerCards = carrusel.querySelector(".container-cards-carrusel");
    let cardsNormal = carrusel.querySelectorAll(".container-card");
    let rectanguloIzq = carrusel.querySelector(".rectangulo-izq");
    let rectanguloDer = carrusel.querySelector(".rectangulo-der");
    let movimientoEnPixeles = 600;
    let totalPixels = cardsNormal.length * 300;
    let movimientosActualesEnPixeles = containerCards.clientWidth;

    btnIzq.addEventListener("click", () => {
        movimientosActualesEnPixeles -= movimientoEnPixeles;

        containerCards.scrollBy({
            left: -movimientoEnPixeles,
            behavior: 'smooth'
        });

        if (rectanguloDer.style.display == "none") {
            rectanguloDer.style.display = "flex";
        }
        if (movimientosActualesEnPixeles <= containerCards.clientWidth) {
            movimientosActualesEnPixeles = containerCards.clientWidth;
            rectanguloIzq.style.display = "none";
        }

        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
    });

    btnDer.addEventListener("click", () => {
        movimientosActualesEnPixeles += movimientoEnPixeles;

        containerCards.scrollBy({
            left: movimientoEnPixeles,
            behavior: 'smooth'
        });

        if (rectanguloIzq.style.display == "none") {
            rectanguloIzq.style.display = "flex";
        }
        if (movimientosActualesEnPixeles >= totalPixels) {
            movimientosActualesEnPixeles = totalPixels;
            rectanguloDer.style.display = "none";
        }

        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
    });
});

// Carrusel especial
let carruselEspecial = document.querySelectorAll(".carrusel-especial");

carruselEspecial.forEach((carrusel) => {
    let btnIzqEspecial = carrusel.querySelector(".btn-izq");
    let btnDerEspecial = carrusel.querySelector(".btn-der");
    let containerCardsEspecial = carrusel.querySelector(".container-cards-carrusel");
    let cardsEspeciales = carrusel.querySelectorAll(".container-card-especial");
    let rectanguloIzqEspecial = carrusel.querySelector(".rectangulo-izq");
    let rectanguloDerEspecial = carrusel.querySelector(".rectangulo-der");
    let movimientoEnPixelesEspecial = 600;
    let totalPixelsEspecial = cardsEspeciales.length * 430;
    let movimientosActualesEnPixelesEspecial = containerCardsEspecial.clientWidth;

    btnIzqEspecial.addEventListener("click", () => {
        movimientosActualesEnPixelesEspecial -= movimientoEnPixelesEspecial;

        containerCardsEspecial.scrollBy({
            left: -movimientoEnPixelesEspecial,
            behavior: 'smooth'
        });

        if (rectanguloDerEspecial.style.display == "none") {
            rectanguloDerEspecial.style.display = "flex";
        }
        if (movimientosActualesEnPixelesEspecial <= containerCardsEspecial.clientWidth) {
            movimientosActualesEnPixelesEspecial = containerCardsEspecial.clientWidth;
            rectanguloIzqEspecial.style.display = "none";
        }

        console.log("toque izq Total pixeles: " + totalPixelsEspecial);
        console.log("Movimiento actual: " + movimientosActualesEnPixelesEspecial);
        rotarDerecha(cardsEspeciales);
    });

    btnDerEspecial.addEventListener("click", () => {
        movimientosActualesEnPixelesEspecial += movimientoEnPixelesEspecial;

        containerCardsEspecial.scrollBy({
            left: movimientoEnPixelesEspecial,
            behavior: 'smooth'
        });

        if (rectanguloIzqEspecial.style.display == "none") {
            rectanguloIzqEspecial.style.display = "flex";
        }
        if (movimientosActualesEnPixelesEspecial >= totalPixelsEspecial) {
            movimientosActualesEnPixelesEspecial = totalPixelsEspecial;
            rectanguloDerEspecial.style.display = "none";
        }

        console.log("Total pixeles: " + totalPixelsEspecial);
        console.log("Movimiento actual: " + movimientosActualesEnPixelesEspecial);
        rotarIzquierda(cardsEspeciales);
    });
});

function rotarIzquierda(cards) {
    cards.forEach(card => {
        card.classList.add('rotar-izquierda');
    });

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('rotar-izquierda'));
    }, 300);
}

function rotarDerecha(cards) {
    cards.forEach(card => {
        card.classList.add('rotar-derecha');
    });

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('rotar-derecha'));
    }, 300);
}
