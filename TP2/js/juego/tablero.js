class Tablero {
    constructor(tamanioJuego,ctx) {
        this.columnas = tamanioJuego + 3; // Definición de columnas
        this.filas = tamanioJuego + 2; // Definición de filas
        this.tamanioCelda = 100; // Chequear como hacemos esto dinámico
        this.ctx = ctx;
        this.tablero = this.crearTableroJuego(); // Crear el tablero después de definir filas y columnas
        console.log(this.tablero);
    }


    crearTableroJuego() {//metodo para crear el tablero apartir de la modalidad del juego
        let tablero = [];
        // Crear la matriz
        for (let i = 0; i < this.filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                tablero[i][j] = this.obtenerAleatorio();  //crear la instancia de casillero y poner que su estado es false (no ocupado)
            }
        }
        return tablero;
    }

    obtenerAleatorio() { //funcion de ayuda para simular el estado ocupado/desocupado (despues desaparece)
        return Math.floor(Math.random() * 2);  // Retorna 0 o 1
    }
    obtenerCasilleroPorColumna(numeroColumna) { //metodo para decidir en que lugar vamos a poner la pieza (de la columna que quiere el lugar mas abajo posible)
        let posFila = this.tablero.length - 1; // Empiezo desde la ultima fila
        let asignada = false; //variable para cortar la ejeuucion

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
                break; // Salir del bucle si no hay más espacio, avisar, o hacer algo
            }
        }
    }

    draw() { //metodo para dibujar el tablero en el canvas
        ctx.strokeStyle = 'black';
        for (let fila = 0; fila < this.filas; fila++) { //recorro todas las filas
            for (let columna = 0; columna < this.columnas; columna++) { //recorro las columnas
                ctx.strokeRect(columna * this.tamanioCelda, fila * this.tamanioCelda, this.tamanioCelda, this.tamanioCelda);//dibujo la linea
            }
        }
    }

    getTablero(){
        return this.tablero
    }
}


