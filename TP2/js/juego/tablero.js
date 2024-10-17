class Tablero {
    constructor(tamanioJuego,ctx) {
        this.tablero = this.crearTableroJuego(tamanioJuego);
        this.ctx = ctx;
    }

    
    crearTableroJuego(tamanioJuego) {//metodo para crear el tablero apartir de la modalidad del juego
        let filas = tamanioJuego + 2;  //revisar cuanto agrandar
        let columnas = tamanioJuego + 3; //revisar cuanto agrandar
        let tablero = [];

        // Crear la matriz
        for (let i = 0; i < filas; i++) { 
            tablero[i] = [];
            for (let j = 0; j < columnas; j++) {
                tablero[i][j] = this.obtenerAleatorio();  //crear la instancia de casillero y poner que su estado es false (no ocupado)
            }
        }
        return tablero;
    }

    obtenerAleatorio() { //funcion de ayuda para simular el estado ocupado/desocupado (despues desaparece)
        return Math.floor(Math.random() * 2);  // Retorna 0 o 1
    }
    

    obtenerCasilleroPorColumna(numeroColumna) { //metodo para decidir en que lugar vamos a poner la pieza (de la columna que quiere el lugar mas abajo posible)
        let posFila = this.tablero.length - 1; // Comenzar desde la última fila
        let asignada = false;
    
        while (!asignada) {
            if (this.tablero[posFila][numeroColumna] == 1) { //aca se validara si el estado del casillero es disponible
                posFila--; // muevo hacia arriba
            } else {
                asignada = true;
                this.tablero[posFila][numeroColumna] = "x"; // Asignar 'x' al primer espacio disponible (asiganar la ficha al casillero)
                console.log("tablero", this.tablero);
            }
            
            if (posFila < 0) {
                console.log("Columna llena");
                break; // Salir del bucle si no hay más espacio
            }
        }
    }

    draw(){ //metodo para dibujar el tablero en el canvas

    }

}


let t = new Tablero(4);
t.obtenerCasilleroPorColumna(3);
