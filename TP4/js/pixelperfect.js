let lin1 = document.getElementById('lin1');
let btnMenu = document.getElementById('btn-menu');
let lin2 = document.getElementById('lin2');
let lin3 = document.getElementById('lin3');
let nav = document.getElementById('nav');
let header = document.getElementById('header');

// Elementos de la sección
let pasto1 = document.querySelector('.container-pasto-1');
let arbol3 = document.querySelector('.container-arbol-3');
let pasto2 = document.querySelector('.container-pasto-2');
let arbol2 = document.querySelector('.container-arbol-2');
let piedra3 = document.querySelector('.container-piedra-3');
let piedra1 = document.querySelector('.container-piedra-1');
let piedra4 = document.querySelector('.container-piedra-4');
let personaje3 = document.querySelector('.container-personaje-3');
let personaje2 = document.querySelector('.container-personaje-2');
let personaje1 = document.querySelector('.container-personaje-1');
let pasto4 = document.querySelector('.container-pasto-4');
let arbol1 = document.querySelector('.container-arbol-1');
let piedra2 = document.querySelector('.container-piedra-2');
let pasto3 = document.querySelector('.container-pasto-3');
let logo = document.querySelector('.logo');

let personaje5 = document.getElementById('personaje-5');
let personaje4 = document.getElementById('personaje-4');
let textoSeccionMasDivertida = document.getElementById('container-texto-seccion-mas-divertida');
let containterImgGaleria = document.getElementById('container-img-galeria');

let seccion1 = document.getElementById('seccion-1');
let seccion4 = document.querySelector('.seccion-4');
let seccion7 = document.getElementById('seccion-7');

btnMenu.addEventListener('click', () => {
  if (lin1.classList.contains('active')) {
    lin1.classList.remove('active');
    lin2.classList.remove('active');
    lin3.classList.remove('active');
    nav.style.display = "none";
  } else {
    lin1.classList.add('active');
    lin2.classList.add('active');
    lin3.classList.add('active');
    nav.style.display = 'block';
  }
});

// Manejador de eventos para el scroll
document.addEventListener('scroll', function (e) {
  const scrollTop = window.scrollY; // cantidad de píxeles que se scrollearon

  // Cambiar tamaño del logo y el fondo al hacer scroll
  if (scrollTop > 15) {
    logo.style.height = "86px";
    logo.style.width = "150px";
    logo.style.top = "20px";
    logo.style.left = "45%";
    logo.style.position = "fixed";
    header.style.backgroundColor = 'white';
  } else {
    logo.style.height = "320px";
    logo.style.width = "560px";
    logo.style.top = "55px";
    logo.style.left = "30%";
    logo.style.position = "absolute";
    header.style.backgroundColor = 'transparent';
  }
   moverSeccion1(scrollTop);
   moverSeccion2(scrollTop);
});

// Mover elementos de la Sección 1 con el scroll
function moverSeccion1(scrollTop) {
  pasto1.style.top = 1 - scrollTop * 0.12 + "px";
  pasto1.style.right = 1 - scrollTop * 0.09 + "px";
  pasto2.style.top = 2 - scrollTop * 0.12 + "px";
  pasto2.style.right = 2 - scrollTop * 0.12 + "px";
  pasto3.style.top = 3 - scrollTop * 0.30 + "px";
  pasto3.style.left = 3 - scrollTop * 1 + "px";
  pasto4.style.top = 3 - scrollTop * 0.12 + "px";
  pasto4.style.left = 3 - scrollTop * 0.12 + "px";

  arbol1.style.top = 1 - scrollTop * 0.12 + "px";
  arbol1.style.left = 1 - scrollTop * 0.12 + "px";
  arbol2.style.top = 2 - scrollTop * 0.12 + "px";
  arbol2.style.right = 2 - scrollTop * 0.12 + "px";
  arbol3.style.top = 3 - scrollTop * 0.12 + "px";
  arbol3.style.right = 3 - scrollTop * 0.12 + "px";

  piedra1.style.top = 1 - scrollTop * 0.2 + "px";
  piedra1.style.right = 1 - scrollTop * 0.2 + "px";
  piedra2.style.top = 2 - scrollTop * 0.2 + "px";
  piedra2.style.left = 2 - scrollTop * 0.5 + "px";
  piedra3.style.top = 3 - scrollTop * 0.10 + "px";
  piedra3.style.right = 3 - scrollTop * 0.10 + "px";
  piedra4.style.top = 3 - scrollTop * 0.25 + "px";
  piedra4.style.right = 3 - scrollTop * 0.25 + "px";

  personaje1.style.top = 3 - scrollTop * 0.25 + "px";
  personaje2.style.top = 3 - scrollTop * 0.25 + "px";
  personaje3.style.top = 3 - scrollTop * 0.25 + "px";
}

function moverSeccion2(scrollTop) {
  personaje5.style.top = 1 - scrollTop * 0.05 + "px";
  personaje4.style.top = 1 - scrollTop * 0.2 + "px";
  textoSeccionMasDivertida.style.right =1 - scrollTop * 0.05 + "px";
  
}
// Mover elementos de la Sección 7 con el movimiento del mouse
const modelViewer = document.querySelector('#reveal');
const container = modelViewer.parentElement;
document.addEventListener('mousemove', (e) => {
  if (seccion7) {
    let rectSeccion7 = seccion7.getBoundingClientRect();
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (mouseX >= rectSeccion7.left && mouseX <= rectSeccion7.right && mouseY >= rectSeccion7.top && mouseY <= rectSeccion7.bottom) {
      const centerX = rectSeccion7.left + rectSeccion7.width / 2;

      const rotationY = ((e.clientX - centerX) / (rectSeccion7.width / 2)) * 180;
      modelViewer.setAttribute('camera-orbit', `${rotationY}deg 90deg 100m`);
    }
  }
});
document.addEventListener('mouseleave', () => {
  modelViewer.setAttribute('camera-orbit', '0deg 90deg 100m');
});

// Detectar mouse en secciones y mover elementos de la sección 4
document.addEventListener("mousemove", (e) => {
  let imgPersonajesSeccion4 = document.getElementById('img-personajes-seccion-4');

  if (seccion4) {
    let rect = seccion4.getBoundingClientRect();
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (mouseY >= rect.top && mouseY <= rect.bottom) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (w - mouseX) * 0.05;
      const y = (h - mouseY) * 0.05;
      imgPersonajesSeccion4.style.left = `${x}px`;
      imgPersonajesSeccion4.style.top = `${y}px`;
      imgPersonajesSeccion4.style.transform = 'scale(1.15)';
    } else {
      imgPersonajesSeccion4.style.left = '0px';
      imgPersonajesSeccion4.style.top = '0px';
      imgPersonajesSeccion4.style.transform = 'scale(1)';

    }
  }
});

//Seccion 5
document.addEventListener('DOMContentLoaded', function () {
  const images = document.querySelectorAll('.container-imagenes-sticky-seccion-5 img');
  const paragraphs = document.querySelectorAll('.container-parrafo-seccion-5');
  const container = document.querySelector('.container-fondo-seccion-5');

  window.addEventListener('scroll', function () {
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Center of the viewport

      const relativeScrollPosition = (scrollPosition - containerTop) / containerHeight;
      
      const imageIndex = Math.floor(relativeScrollPosition * paragraphs.length);
      
      images.forEach((img, index) => {
          img.style.opacity = (index === imageIndex) ? 1 : 0;
      });
  });
});
//-----

// Cambiar imágenes de la galería en intervalos
let imagenes = [
  './images/imagen-galeria-1.png',
  './images/imagen-galeria-2.png',
  './images/imagen-galeria-3.png',
  './images/imagen-galeria-4.png',
];

let indice = 0;

function cambiarImagen() {
  let imgElemento = document.getElementById('img-galeria');

  if (imgElemento && imagenes[indice]) {
    imgElemento.src = imagenes[indice];
  }

  indice++;
  if (indice >= imagenes.length) {
    indice = 0;
  }
}

setInterval(cambiarImagen, 3000);

// Verificar el desplazamiento para aplicar la animación de las tarjetas de la galería
window.addEventListener("scroll", getScroll);

function getScroll() {
  const y = this.pageYOffset;
  checkScrollForCards(y);
}

function checkScrollForCards(y) {
  let cards = document.querySelectorAll('.galeria-container');

  if (y >= 1300) {
    cards.forEach(card => {
      card.classList.add('float-animation');
    });
  } else {
    cards.forEach(card => {
      card.classList.remove('float-animation');
    });
  }
}
