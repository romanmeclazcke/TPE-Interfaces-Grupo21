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
    let cards = carrusel.querySelectorAll(".container-card-especial");
    let cardsNormal = carrusel.querySelectorAll(".container-card");
    let movimientoEnPixeles = 600;
    let totalPixels = cardsNormal.length * 300; //tamanio de la card
    let movimientosActualesEnPixeles = containerCards.clientWidth; //siempre arranco desde el ancho del contendor dado que sino funciona mal(tomo el ancho del contenedor a desplazar)

    btnIzq.addEventListener("click", () => {
        movimientosActualesEnPixeles -= movimientoEnPixeles;

        containerCards.scrollBy({
            left: -movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (btnDer.style.display == "none") {
            btnDer.style.display="block"
        }
        if (movimientosActualesEnPixeles <= 0) {
            movimientosActualesEnPixeles=containerCards.clientWidth;
            btnIzq.style.display="none"
        }
        
        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
        rotarDerecha(cards);
    });

    btnDer.addEventListener("click", () => {
        movimientosActualesEnPixeles += movimientoEnPixeles;
        
        containerCards.scrollBy({
            left: movimientoEnPixeles,
            behavior: 'smooth' // Scroll suave
        });

        if (btnIzq.style.display == "none") {
            btnIzq.style.display="block"
        }
        if (movimientosActualesEnPixeles >= totalPixels) {
            movimientosActualesEnPixeles=totalPixels-containerCards.clientWidth;
            btnDer.style.display="none"
        }
        console.log("Total pixeles: " + totalPixels);
        console.log("Movimiento actual: " + movimientosActualesEnPixeles);
        rotarIzquierda(cards);
    });
});

function rotarIzquierda(cards) {
    cards.forEach(card => {
        card.classList.add('rotar-izquierda');
        card.classList.remove('rotar-derecha');
    });

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('rotar-izquierda'));
    }, 300); 
}

function rotarDerecha(cards) {
    cards.forEach(card => {
        card.classList.add('rotar-derecha');
        card.classList.remove('rotar-izquierda');
    });

    setTimeout(() => {
        cards.forEach(card => card.classList.remove('rotar-derecha'));
    }, 300); 
}
