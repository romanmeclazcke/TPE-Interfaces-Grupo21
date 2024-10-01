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

let carruseles = document.querySelectorAll(".carrusel");

carruseles.forEach((carrusel) => {
    let btnIzq = carrusel.querySelector(".btn-izq");
    let btnDer = carrusel.querySelector(".btn-der");
    let containerCards = carrusel.querySelector(".container-cards-carrusel");
    let cardsNormal = carrusel.querySelectorAll(".container-card");
    let rectanguloIzq = carrusel.querySelector(".rectangulo-izq")
    let rectanguloDer = carrusel.querySelector(".rectangulo-der")
    let movimientoEnPixeles = 600;
    let totalPixels = cardsNormal.length * 300; //tamanio de la card
    let movimientosActualesEnPixeles = cardsNormal.clientWidth; //siempre arranco desde el ancho del contendor dado que sino funciona mal(tomo el ancho del contenedor a desplazar)

    btnIzq.addEventListener("click", () => {
        movimientosActualesEnPixeles -= movimientoEnPixeles;

        containerCards.scrollBy({
            left: -movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (rectanguloDer.style.display == "none") {
            rectanguloDer.style.display = "flex"
        }
        if (movimientosActualesEnPixeles <= 0) {
            movimientosActualesEnPixeles = 0;
            rectanguloIzq.style.display = "none"
        }

        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
    });

    btnDer.addEventListener("click", () => {
        movimientosActualesEnPixeles += movimientoEnPixeles;

        containerCards.scrollBy({
            left: movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (rectanguloIzq.style.display == "none") {
            rectanguloIzq.style.display = "flex"
        }
        if (movimientosActualesEnPixeles >= totalPixels) {
            movimientosActualesEnPixeles = totalPixels;
            rectanguloDer.style.display = "none"
        }
        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
    });
});

/*Movimiento carrusel especial */

let carruselEspecial = document.querySelectorAll(".carrusel-especial");

carruselEspecial.forEach((carrusel) => {
    let btnIzq = carrusel.querySelector(".btn-izq");
    let btnDer = carrusel.querySelector(".btn-der");
    let containerCards = carrusel.querySelector(".container-cards-carrusel");
    let cardsEspeciales = carrusel.querySelectorAll(".container-card-especial");
    let rectanguloIzq = carrusel.querySelector(".rectangulo-izq")
    let rectanguloDer = carrusel.querySelector(".rectangulo-der")
    let movimientoEnPixeles = 600;
    let totalPixels = cardsEspeciales.length * 430; //tamanio de la card especial
    let movimientosActualesEnPixeles = containerCards.clientWidth; //siempre arranco desde el ancho del contendor dado que sino funciona mal(tomo el ancho del contenedor a desplazar)
    console.log("total  pixeles  "+totalPixels )

    btnIzq.addEventListener("click", () => {
        movimientosActualesEnPixeles -= movimientoEnPixeles;

        containerCards.scrollBy({
            left: -movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (rectanguloDer.style.display == "none") {
            rectanguloDer.style.display = "flex"
        }
        if (movimientosActualesEnPixeles <= 0) {
            movimientosActualesEnPixeles = containerCards.clientWidth;
            rectanguloIzq.style.display = "none"
        }

        console.log("toque izq Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
        rotarDerecha(cardsEspeciales)
    });

    btnDer.addEventListener("click", () => {
        movimientosActualesEnPixeles += movimientoEnPixeles;

        containerCards.scrollBy({
            left: movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (rectanguloIzq.style.display == "none") {
            rectanguloIzq.style.display = "flex"
        }
        if (movimientosActualesEnPixeles >= totalPixels) {
            movimientosActualesEnPixeles = totalPixels - containerCards.clientWidth;
            rectanguloDer.style.display = "none"
        }
        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
        rotarIzquierda(cardsEspeciales)
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
