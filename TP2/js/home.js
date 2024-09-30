let menu = document.getElementById("menu-hamburguesa");
let btn_cerrar_menu = document.getElementById("btn-cerrar-menu");
let btn_abrir_menu = document.getElementById("btn-abrir-menu");

btn_abrir_menu.addEventListener("click",  (e)=> {
    e.preventDefault()
    menu.style.display = "block"; 
});

btn_cerrar_menu.addEventListener("click", (e)=> {
    e.preventDefault()
    menu.style.display = "none"; 
});