let btnMenu = document.getElementById('btn-menu');

btnMenu.addEventListener('click', () => {
  let lin1 = document.getElementById('lin1');
  let lin2 = document.getElementById('lin2');
  let lin3 = document.getElementById('lin3');
  let nav = document.getElementById('nav')

  if (lin1.classList.contains('active')) {
    lin1.classList.remove('active');
    lin2.classList.remove('active');
    lin3.classList.remove('active');
    nav.style.display = 'none'

  } else {
    lin1.classList.add('active');
    lin2.classList.add('active');
    lin3.classList.add('active');
    nav.style.display = 'block'
  }
});


document.addEventListener('scroll', function() {
  const scrollTop = window.scrollY; //cantidad de pixeles que se scrollearon
  let logo = document.getElementById('logo')

  const elements = [
    { selector: '.container-pasto-1', speed: 0.1 },
    { selector: '.container-arbol-3', speed: 0.2 },
    { selector: '.container-pasto-2', speed: 0.3 },
    { selector: '.container-arbol-2', speed: 0.4 },
    { selector: '.container-piedra-3', speed: 0.5 },
    { selector: '.container-piedra-1', speed: 0.6 },
    { selector: '.container-piedra-4', speed: 0.7 },
    { selector: '.container-personaje-3', speed: 0.80 },
    { selector: '.container-personaje-2', speed: 0.80 },
    { selector: '.container-personaje-1', speed: 0.80 },
    { selector: '.container-pasto-4', speed: 0.92 },
    { selector: '.container-arbol-1', speed: 0.93 },
    { selector: '.container-piedra-2', speed: 0.94 },
    { selector: '.container-pasto-3', speed: 0.95 },
    { selector: '.container-logo', speed: 0.99 }
  ];

  if (scrollTop > 150) {
    logo.style.height = "86px"
    logo.style.width = "150px"
    logo.style.left="45%"
    logo.style.top="36px";
  } else {
    logo.style.height = "320px"
    logo.style.width = "560px"
    logo.style.top="55px";
    logo.style.left="360px";
  }
  elements.forEach(element => {
      const el = document.querySelector(element.selector); 
      if (el) { 
          el.style.transform = `translateY(${scrollTop * element.speed}px)`;
      }
  });
});
