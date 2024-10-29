class Tablero {
    constructor(tamanioJuego, ctx) {
        this.enLinea = tamanioJuego;
        this.columnas = tamanioJuego + 3; // Definición de columnas
        this.filas = tamanioJuego + 2; // Definición de filas
        this.tamanioCelda = tamanioJuego <= 5 ? 60 : 50;//En el 6 y 7 en linea achicamos las celdas para que entren en el canvas
        this.ctx = ctx;
        this.tablero = this.crearTableroJuego(); // Crear el tablero después de definir filas y columnas
        this.hints = this.crearHints();
    }

    //metodo para crear el tablero a partir de la modalidad del juego
    crearTableroJuego() {
        const rutaImagenCasillero = '././images/casilla-imagen.png';
        const cantPxEnYParaBajarTablero = 30;
        // Obtener tamaño del canvas
        const canvasWidth = this.ctx.canvas.width;
        const canvasHeight = this.ctx.canvas.height;
        // Calcular el tamaño total del tablero
        const tableroWidth = this.columnas * this.tamanioCelda;
        const tableroHeight = this.filas * this.tamanioCelda;
        // Calcular el desplazamiento para centrar el tablero
        const desplazamientoX = (canvasWidth - tableroWidth) / 2;
        //En vez de colocar el tablero en el medio, lo colocamos un poco mas abajo para que se renderize correctamente
        const desplazamientoY = (((canvasHeight - tableroHeight) / 2) + cantPxEnYParaBajarTablero);

        let tablero = [];

        // Crear la matriz
        for (let i = 0; i < this.filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                const x = desplazamientoX + j * this.tamanioCelda; // Calculo posición x de la celda
                const y = desplazamientoY + i * this.tamanioCelda; // Calculo posición y de la celda
                tablero[i][j] = new Casillero(this.ctx, rutaImagenCasillero, x, y, this.tamanioCelda);
            }
        }
        return tablero;
    }

    //metodo para crear las hints donde se podra soltar las fichas
    crearHints() {
        let hints = [];
        const canvasWidth = this.ctx.canvas.width;
        const tableroWidth = this.columnas * this.tamanioCelda;
        const desplazamientoX = (canvasWidth - tableroWidth) / 2;
        const posicionY = ((this.ctx.canvas.height - this.filas * this.tamanioCelda) / 2);

        for (let i = 0; i < this.columnas; i++) {
            const x = (desplazamientoX + i * this.tamanioCelda) + this.tamanioCelda / 2;
            hints.push(new Hints(this.ctx, x, posicionY, this.tamanioCelda, 20));
        }

        return hints;
    } //revisar tema hints (Es responsabilidad del tablero??)

    draw() {//metodo para dibujar el tablero en el canvas
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].draw();//dibujo el casillero
            }
        }
        this.drawHints(); //dibujo las hints
    }

    drawFondo() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].drawFondo();//dibujo el casillero
            }
        }
    }

    drawHints() {
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

    obtenerHint(numeroHint) {
        return this.hints[numeroHint]
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

    existeGanador(jugador) {
        for (let f = 0; f < this.filas; f++) {
            for (let c = 0; c < this.columnas; c++) {
                let casillero = this.tablero[f][c];

                if (!casillero.estaLibre()) { //Si tiene una ficha
                    let ficha = casillero.getFicha();

                    console.log(`Comparando ficha.getJugador(): ${ficha.getJugador()} con jugador: ${jugador}`);
                    if (ficha.getJugador() === jugador) {
                        console.log(`Ficha del jugador ${jugador} encontrada en [${f}, ${c}]`);
                        //Verifico horizontal, vertical, y ambas diagonales
                        if (this.contarFichasConsecutivas(f, c, 1, 0, ficha) >= this.enLinea || //Horizontal
                            this.contarFichasConsecutivas(f, c, 0, 1, ficha) >= this.enLinea || //Vertical
                            this.contarFichasConsecutivas(f, c, 1, 1, ficha) >= this.enLinea || //Diagonal /
                            this.contarFichasConsecutivas(f, c, 1, -1, ficha) >= this.enLinea) //Diagonal \
                                return true;
                    }
                }
            }
        }
        return false;
    }

    contarFichasConsecutivas(fila, columna, direccionFila, direccionColumna, ficha) {
        let contador = 0;
        console.log(`Contando fichas desde [${fila}, ${columna}] en dirección [${direccionFila}, ${direccionColumna}]`);

        while (fila >= 0 && fila < this.filas && //Para que el recorrido se mantenga adentro del tablero
                columna >= 0 && columna < this.columnas && //Para que el recorrido se mantenga adentro del tablero
                this.tablero[fila][columna].getFicha() === ficha) { //Si el casillero actual tiene una ficha del mismo tipo que la original (es del mismo equipo)
                    contador++;
                    console.log(`Contador incrementado a ${contador} en [${fila}, ${columna}]`);

                    if (contador >= this.enLinea) {
                        console.log(`Contador: ${contador}, Ficha: ${ficha.getJugador()}`); 
                        return contador;
                    }
                        
                    fila += direccionFila;
                    columna += direccionColumna;
            }
        console.log(`Contador final desde [${fila}, ${columna}]: ${contador}`);
        return contador;
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

    mostrarHints() {
        this.hints.forEach(hint => hint.mostrar());
    }

    ocultarHints() {
        this.hints.forEach(hint => hint.ocultar());

    }
}


