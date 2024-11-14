let lin1 = document.getElementById('lin1');
let btnMenu = document.getElementById('btn-menu');
let lin2 = document.getElementById('lin2');
let lin3 = document.getElementById('lin3');
let nav = document.getElementById('nav')
let header = document.getElementById('header')


//elementos seccion
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
let textoSeccionMasDivertida = document.getElementById('container-texto-seccion-mas-divertida')
let containterImgGaleria = document.getElementById('container-img-galeria');

btnMenu.addEventListener('click', () => {

  if (lin1.classList.contains('active')) {
    lin1.classList.remove('active');
    lin2.classList.remove('active');
    lin3.classList.remove('active');
    nav.style.display="none"
  } else {
    lin1.classList.add('active');
    lin2.classList.add('active');
    lin3.classList.add('active');
    nav.style.display = 'block'
  }
});


document.addEventListener('scroll', function () {
  const scrollTop = window.scrollY; //cantidad de pixeles que se scrollearon
    if (scrollTop > 15) {
    logo.style.height = "86px";
    logo.style.width = "150px";
    logo.style.top = "20px";
    logo.style.left = "600px"
    logo.style.position = "fixed";
    header.style.backgroundColor = 'white';
  } else {
    logo.style.height = "320px";
    logo.style.width = "560px";
    logo.style.top = "55px";
    logo.style.left = "360px"
    logo.style.position = "absolute";
    header.style.backgroundColor = 'transparent';
  }



  pasto1.style.top = 1 - scrollTop * 0.12 + "px";
  pasto1.style.right = 1 - scrollTop * 0.09 + "px";
  pasto2.style.top = 2 - scrollTop * 0.12 + "px";
  pasto2.style.right = 2 - scrollTop * 0.12 + "px"
  pasto3.style.top = 3 - scrollTop * 0.30 + "px"
  pasto3.style.left = 3 - scrollTop * 1 + "px"
  pasto4.style.top = 3 - scrollTop * 0.12 + "px"
  pasto4.style.left = 3 - scrollTop * 0.12 + "px"

  arbol1.style.top = 1 - scrollTop * 0.12 + "px"
  arbol1.style.left = 1 - scrollTop * 0.12 + "px"
  arbol2.style.top = 2 - scrollTop * 0.12 + "px"
  arbol2.style.right = 2 - scrollTop * 0.12 + "px"
  arbol3.style.top = 3 - scrollTop * 0.12 + "px"
  arbol3.style.right = 3 - scrollTop * 0.12 + "px"

  piedra1.style.top = 1 - scrollTop * 0.2 + "px"
  piedra1.style.right = 1 - scrollTop * 0.2 + "px"
  piedra2.style.top = 2 - scrollTop * 0.2 + "px"
  piedra2.style.left = 2 - scrollTop * 0.5 + "px"
  piedra3.style.top = 3 - scrollTop * 0.10 + "px"
  piedra3.style.right = 3 - scrollTop * 0.10 + "px"
  piedra4.style.top = 3 - scrollTop * 0.25 + "px"
  piedra4.style.right = 3 - scrollTop * 0.25 + "px"

  personaje1.style.top = 3 - scrollTop * 0.25 + "px"
  personaje2.style.top = 3 - scrollTop * 0.25 + "px"
  personaje3.style.top = 3 - scrollTop * 0.25 + "px"


    // personaje5.style.top = 1 - scrollTop * 0.3 + "px";
    // textoSeccionMasDivertida.style.top = 1 - scrollTop * 0.2 + "px";
    // personaje4.style.top = 1 - scrollTop * 0.1 + "px"; 
    // containterImgGaleria.style.top = 1 - scrollTop * 0.05 + "px"; 
  
});


document.addEventListener("mousemove", (e) => {
  let seccion4 = document.querySelector('.seccion-4');
  let imgPersonajesSeccion4 = document.getElementById('img-personajes-seccion-4');

  if (seccion4) {
    let rect = seccion4.getBoundingClientRect();
    let mouseX = e.clientX;
    let mouseY = e.clientY;

    if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = (w - mouseX) * 0.05;
      const y = (h - mouseY) * 0.05;
      imgPersonajesSeccion4.style.left = `${x}px`;
      imgPersonajesSeccion4.style.top = `${y}px`;
    } else {
      //restablezco la posocion original si estoy fuera de la zona de la seccion
      imgPersonajesSeccion4.style.left = '0px';
      imgPersonajesSeccion4.style.top = '0px';
    }
  }
});

//Seccion 5
// const images = [
//   'images/personaje-0-seccion-5.png',
//   'images/personaje-1-seccion-5.png',
//   'images/personaje-2-seccion-5.png',
//   'images/personaje-3-seccion-5.png',
//   'images/personaje-4-seccion-5.png',
//   'images/personaje-5-seccion-5.png',
//   'images/personaje-6-seccion-5.png',
//   'images/personaje-7-seccion-5.png',
//   'images/personaje-8-seccion-5.png',
//   'images/personaje-9-seccion-5.png',
//   'images/personaje-10-seccion-5.png',
// ];

// const imageElement = document.querySelector('.container-imagenes-sticky-seccion-5 img');
// const sections = document.querySelectorAll('.container-parrafo-seccion-5');

// document.querySelector('.container-parrafos-seccion-5').addEventListener('scroll', () => {
//   sections.forEach((section, index) => {
//       const rect = section.getBoundingClientRect();
//       const containerRect = section.parentElement.getBoundingClientRect();
//       if (rect.top >= containerRect.top && rect.bottom <= containerRect.bottom) {
//           imageElement.src = images[index];
//       }
//   });
// });


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
