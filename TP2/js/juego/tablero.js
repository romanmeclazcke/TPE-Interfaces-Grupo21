class Tablero {
    constructor(tamanioJuego, ctx) {
        this.columnas = tamanioJuego + 3; // Definición de columnas
        this.filas = tamanioJuego + 2; // Definición de filas
        this.tamanioCelda = 60; // Chequear como hacemos esto dinámico
        this.ctx = ctx;
        this.tablero = this.crearTableroJuego(); // Crear el tablero después de definir filas y columnas
        this.hints = this.crearHints();
    }

    crearTableroJuego() {//metodo para crear el tablero apartir de la modalidad del juego
        let tablero = [];
        // Obtener tamaño del canvas
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;

        // Calcular el tamaño total del tablero
        const tableroWidth = this.columnas * this.tamanioCelda;
        const tableroHeight = this.filas * this.tamanioCelda;

        // Calcular el desplazamiento para centrar el tablero
        const desplazamientoX = (canvasWidth - tableroWidth) / 2;
        const desplazamientoY = (canvasHeight - tableroHeight) / 2;

        // Crear la matriz
        for (let i = 0; i < this.filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                const x = desplazamientoX + j * this.tamanioCelda; // Calculo posición x de la ceda
                const y = desplazamientoY + i * this.tamanioCelda; // Calculo posición y de la cedla
                tablero[i][j] = new Casillero(this.ctx, '././images/casilla-imagen.png', x, y, this.tamanioCelda);
            }
        }
        return tablero;
    }

    crearHints() { //metodo para crear las hinst donde se podra soltar las fichas
        let hints = [];
        const canvasWidth = this.ctx.canvas.width;
        const tableroWidth = this.columnas * this.tamanioCelda;
        const desplazamientoX = (canvasWidth - tableroWidth) / 2;
        const posicionY = (this.ctx.canvas.height - this.filas * this.tamanioCelda) / 2 - 30; //calculo donde ira las hinst en el eje y, las situo 30px por encima del tablero
        for (let i = 0; i < this.columnas; i++) {
            const x = (desplazamientoX + i * this.tamanioCelda) + this.tamanioCelda / 2;
            hints.push(new Hints(this.ctx, x, posicionY, this.tamanioCelda, 20));
        }

        return hints;
    } //revisar tema hinst (Es responsabilidad del tablero??)

    draw() {//metodo para dibujar el tablero en el canvas
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].draw();//dibujo el casillero
            }
        }
        this.drawHinsts(); //dibujo las hints
    }

    drawFondo() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].drawFondo();//dibujo el casillero
            }
        }
    }

    drawHinsts() {
        for (let hint of this.hints) {
            hint.draw();
        }
    }

    obtenerCasilleroPorColumna(numeroColumna) {
        let posFila = this.tablero.length - 1; // Empezamos desde la última fila

        // Iteramos desde abajo hacia arriba hasta encontrar una casilla disponible
        while (posFila >= 0) {
            if (this.tablero[posFila][numeroColumna].estaLibre()) {
                return this.tablero[posFila][numeroColumna];
            }
            posFila--;
        }

        // Si llegamos aquí, significa que la columna está llena
        return null;
    }

    esPosicionValida(fichaX, fichaY) { //pregunto a mis hints si la posocion donde se solto la ficha es valida
        for (let hint of this.hints) {
            if (hint.estaDentro(fichaX, fichaY)) {
                return true
            }
        }
        return false
    }

    obtenerColumna(fichaX, fichaY) {
        for (let i = 0; i < this.hints.length; i++) {
            if (this.hints[i].estaDentro(fichaX, fichaY)) {
                return i;
            }
        }
        return null
    }


    getTablero() {
        return this.tablero
    }

    existeGanador() {

    }

    esZonaProhibida(x, y) { //checkea si el mouse esta dentro del area del tablero
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;

        const tableroWidth = this.columnas * this.tamanioCelda;
        const tableroHeight = this.filas * this.tamanioCelda;

        const desplazamientoX = (canvasWidth - tableroWidth) / 2;
        const desplazamientoY = (canvasHeight - tableroHeight) / 2;

        // Verifica si x e y están dentro de los límites del tablero
        return (
            x >= desplazamientoX &&
            x <= desplazamientoX + tableroWidth &&
            y >= desplazamientoY &&
            y <= desplazamientoY + tableroHeight
        );
    }
}


