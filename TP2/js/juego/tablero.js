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
                if (i == 0) { // Si está en la primera fila
                    //TODO:aca creo que deberiamos crear los hits
                }
                tablero[i][j] = new Casillero(this.ctx, false, '././images/casilla-imagen.png', x, y, this.tamanioCelda);
            }
        }
        return tablero;
    }

    crearHints() { //metodo para crear las hinst donde se podra soltar las fichas
        const hints = [];
        const canvasWidth = this.ctx.canvas.width;
        const tableroWidth = this.columnas * this.tamanioCelda;
        const desplazamientoX = (canvasWidth - tableroWidth) / 2; 
    
        for (let i = 0; i < this.columnas; i++) {
            const x = (desplazamientoX + i * this.tamanioCelda)+this.tamanioCelda/4; 
            const y = this.tamanioCelda; 
            hints.push(new Hints(this.ctx, x, this.tamanioCelda, this.tamanioCelda/2, '././images/hint.png'));
        }
    
        return hints;
    }

    draw() {//metodo para dibujar el tablero en el canvas
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].draw();//dibujo el casillero
            }
        }
        this.drawHinsts(); //dibujo las hints
    }

    drawFondo(){
        for (let fila = 0; fila < this.filas; fila++) {
            for (let columna = 0; columna < this.columnas; columna++) {
                this.tablero[fila][columna].drawFondo();//dibujo el casillero
            }
        }
    }

    drawHinsts(){
        for(let hint of this.hints){
            hint.draw();
        }
    }

    obtenerCasilleroPorColumna(numeroColumna) { //metodo para decidir en que lugar vamos a poner la pieza (de la columna que quiere el lugar mas abajo posible)
        let posFila = this.tablero.length - 1; // Empiezo desde la ultima fila
        let asignada = false; //variable para cortar la ejecucion

        while (!asignada) {
            if (this.tablero[posFila][numeroColumna].isOcupado()) { //aca se validara si el estado del casillero es disponible
                posFila--; // muevo hacia arriba
            } else {
                asignada = true;
                this.tablero[posFila][numeroColumna].isOcupado = true; // Asignar 'x' al primer espacio disponible (asiganar la ficha al casillero)
                console.log("tablero", this.tablero);
                return this.tablero[posFila][numeroColumna]
            }

            if (posFila < 0) {
                console.log("Columna llena");
                break; // Salir del bucle si no hay más espacio, avisar, o hacer algo
            }
        }
    }

    esPosicionValida(fichaX,fichaY){ //pregunto a mis hints si la posocion donde se solto la ficha es valida
        for(let hint of this.hints){
            if(hint.estaDentro(fichaX,fichaY)){
                return true
            }
        }
        return false
    }


    getTablero() {
        return this.tablero
    }

    existeGanador() {

    }
}


