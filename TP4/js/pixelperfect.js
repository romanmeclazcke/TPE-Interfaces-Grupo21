let btnMenu = document.getElementById('btn-menu');

btnMenu.addEventListener('click', () => {
  let lin1 = document.getElementById('lin1');
  let lin2 = document.getElementById('lin2');
  let lin3 = document.getElementById('lin3');

  lin1.classList.add('active');
  lin3.classList.add('active');
  lin2.style.visibility = 'hidden'; 
});
