let btnMenu = document.getElementById('btn-menu');
let lin1 = document.getElementById('lin1');
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


document.addEventListener('scroll', function() {
  const scrollTop = window.scrollY; //cantidad de pixeles que se scrollearon
  
    if (scrollTop > 15) {
      logo.style.height = "86px";
      logo.style.width = "150px";
      logo.style.top = "20px";  
      logo.style.left="600px"
      logo.style.position = "fixed"; 
      header.style.backgroundColor = 'white';
    } else {
      logo.style.height = "320px";
      logo.style.width = "560px";
      logo.style.top = "55px"; 
      logo.style.left="360px"
      logo.style.position = "absolute"; 
      header.style.backgroundColor = 'transparent';
    }

  
  
  pasto1.style.top= 1- scrollTop*0.12 + "px";
  pasto1.style.right= 1- scrollTop*0.09 + "px";
  pasto2.style.top= 2- scrollTop*0.12 + "px";
  pasto2.style.right = 2-scrollTop*0.12 + "px"
  pasto3.style.top = 3-scrollTop*0.30 + "px"
  pasto3.style.left = 3-scrollTop*1 + "px"
  pasto4.style.top = 3-scrollTop*0.12 + "px"
  pasto4.style.left = 3-scrollTop*0.12 + "px"

  arbol1.style.top = 1-scrollTop*0.12 + "px"
  arbol1.style.left = 1-scrollTop*0.12 + "px"
  arbol2.style.top = 2-scrollTop*0.12 + "px"
  arbol2.style.right = 2-scrollTop*0.12 + "px"
  arbol3.style.top = 3-scrollTop*0.12 + "px"
  arbol3.style.right = 3-scrollTop*0.12 + "px"

  piedra1.style.top = 1-scrollTop*0.2 + "px"
  piedra1.style.right = 1-scrollTop*0.2 + "px"
  piedra2.style.top = 2-scrollTop*0.2 + "px"
  piedra2.style.left = 2-scrollTop*0.5 + "px"
  piedra3.style.top = 3-scrollTop*0.10 + "px"
  piedra3.style.right = 3-scrollTop*0.10 + "px"
  piedra4.style.top = 3-scrollTop*0.25 + "px"
  piedra4.style.right = 3-scrollTop*0.25 + "px"

 personaje1.style.top=3-scrollTop*0.25 + "px"
 personaje2.style.top=3-scrollTop*0.25 + "px"
 personaje3.style.top=3-scrollTop*0.25 + "px"

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

