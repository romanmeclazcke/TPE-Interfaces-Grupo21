class Tablero {
    constructor(tamanioJuego, ctx, canvasWidth, canvasHeight) {
        this.columnas = tamanioJuego + 3; // Definición de columnas
        this.filas = tamanioJuego + 2; // Definición de filas
        this.tamanioCelda = tamanioJuego <= 4 ? 75 : 55; // Chequear como hacemos esto dinámico
        this.ctx = ctx;
        this.tablero = this.crearTableroJuego(); // Crear el tablero después de definir filas y columnas

        // Calcular las posiciones para centrar el tablero
        this.anchoTablero = this.columnas * this.tamanioCelda; // Ancho total del tablero
        this.alturaTablero = this.filas * this.tamanioCelda; // Altura total del tablero
        this.posX = (canvasWidth - this.anchoTablero) / 2; // Posición X para centrar
        this.posY = (canvasHeight - this.alturaTablero) / 2; // Posición Y para centrar
    }

    crearTableroJuego() {
        let tablero = [];
        // Crear la matriz
        for (let i = 0; i < this.filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                tablero[i][j] = new Casillero(this.ctx, false);
            }
        }
        return tablero;
    }

    obtenerAleatorio() {
        return Math.floor(Math.random() * 2);  // Retorna 0 o 1
    }
    obtenerCasilleroPorColumna(numeroColumna) { //metodo para decidir en que lugar vamos a poner la pieza (de la columna que quiere el lugar mas abajo posible)
        let posFila = this.tablero.length - 1; // Empiezo desde la ultima fila
        let asignada = false; //variable para cortar la ejeuucion

        while (!asignada) {
            if (this.tablero[posFila][numeroColumna].isOcupado()) {
                posFila--; // muevo hacia arriba
            } else {
                asignada = true;
                this.tablero[posFila][numeroColumna].ocupado = true; // Asignar 'x' al primer espacio disponible
            }

            if (posFila < 0) {
                console.log("Columna llena");
                break; // Salir del bucle si no hay más espacio
            }
        }
    }

    draw() {
        this.ctx.strokeStyle = 'black';
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.ctx.strokeRect(
                    this.posX + columna * this.tamanioCelda, // Ajuste X
                    this.posY + fila * this.tamanioCelda, // Ajuste Y
                    this.tamanioCelda,
                    this.tamanioCelda
                ); // Dibujo la línea
            }
        }
    }

    getTablero() {
        return this.tablero;
    }
}