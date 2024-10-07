document.getElementById("loader").style.display = "flex";
let header = document.querySelector(".header");
let menu = document.getElementById("menu-hamburguesa");
let btnCerrarMenu = document.getElementById("btn-cerrar-menu");
let btnAbrirMenu = document.getElementById("btn-abrir-menu");
let carruseles = document.querySelectorAll(".carrusel, .carrusel-especial");
let footer= document.querySelector("footer")

menu.style.display = "none";
header.style.display = "none";

carruseles.forEach(carrusel => {
    const wrapper = document.createElement('div');
    wrapper.style.height = '0';
    wrapper.style.overflow = 'hidden';
    carrusel.parentNode.insertBefore(wrapper, carrusel);
    wrapper.appendChild(carrusel);
});

footer.style.display="none"

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
        header.style.display = "flex";
        carruseles.forEach(carrusel => {
            footer.style.display="block"
            const wrapper = carrusel.parentNode;
            wrapper.style.height = 'auto';
            wrapper.style.transition = 'height 0.5s ease-in-out';
        });
        document.getElementById("loader").style.display = "none";
        clearInterval(interval);
    }
}, 500);


// Carruseles normales
let carruselesNormales = document.querySelectorAll(".carrusel");
carruselesNormales.forEach((carrusel) => {
    let btnIzq = carrusel.querySelector(".btn-izq");
    let btnDer = carrusel.querySelector(".btn-der");
    let containerCards = carrusel.querySelector(".container-cards-carrusel");
    let cardsNormal = carrusel.querySelectorAll(".container-card");
    let rectanguloIzq = carrusel.querySelector(".rectangulo-izq");
    let rectanguloDer = carrusel.querySelector(".rectangulo-der");
    let movimientoEnPixeles = 350;
    
    
    let totalPixels = (cardsNormal.length * 300) - containerCards.clientWidth;

    
    rectanguloIzq.style.display = "none"; 
    rectanguloDer.style.display = "flex"; 

    containerCards.addEventListener('scroll', () => {
        let scrollX = containerCards.scrollLeft;

        console.log('Scroll X:', scrollX);
        console.log('Total pixels:', totalPixels);

       
        if (scrollX > 0) {
            rectanguloIzq.style.display = "flex"; 
        } else {
            rectanguloIzq.style.display = "none";
        }

        if (scrollX >= totalPixels) {
            rectanguloDer.style.display = "none"; 
        } else {
            rectanguloDer.style.display = "flex"; 
        }
    });

    btnIzq.addEventListener("click", () => {
        containerCards.scrollBy({
            left: -movimientoEnPixeles,
            behavior: 'smooth'
        });
    });

    btnDer.addEventListener("click", () => {
        containerCards.scrollBy({
            left: movimientoEnPixeles,
            behavior: 'smooth'
        });
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
    let movimientoEnPixelesEspecial = 450;
    let movimientosActualesEnPixelesEspecial = containerCardsEspecial.clientWidth;


    let totalPixelsEspecial = (cardsEspeciales.length * 430) - containerCardsEspecial.clientWidth;

    
    rectanguloIzqEspecial.style.display = "none"; 
    rectanguloDerEspecial.style.display = "flex"; 

    containerCardsEspecial.addEventListener('scroll', () => {
        let scrollX = containerCardsEspecial.scrollLeft;

        if (scrollX > 0) {
            rectanguloIzqEspecial.style.display = "flex"; 
        } else {
            rectanguloIzqEspecial.style.display = "none";
        }

        if (scrollX >= totalPixelsEspecial) {
            rectanguloDerEspecial.style.display = "none"; 
        } else {
            rectanguloDerEspecial.style.display = "flex"; 
        }
    });

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