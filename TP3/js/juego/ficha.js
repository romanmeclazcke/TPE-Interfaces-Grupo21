class Ficha {
    constructor(ctx, color, jugador, x, y, radio, imgSrc) {
        this.ctx = ctx;
        this.color = color;
        this.jugador = jugador;
        this.x = x;
        this.y = y;
        this.radio = radio;
        this.fueMovida=false;
        this.img = new Image();
        this.img.src = imgSrc;
        this.imagenCargada = new Promise((resolve) => {
            this.img.onload = () => {
                resolve(); //resuelvo la promesa cuando se termina de cargar, (solucione problema de dibujar la imagen antes de cargarla)
            };
        });
    }

    async draw() {
        //espero a que la imagen este cargada para comenzar a dibujar
        await this.imagenCargada;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.clip();
        this.ctx.drawImage(this.img, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2);
        this.ctx.restore();
    
        // Dibujo borde de la ficha
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.strokeStyle = 'white'; 
        this.ctx.lineWidth = 1; 
        this.ctx.stroke();
        this.ctx.closePath();
    }
    

    estaSeleccionada(posicionXMouse, posicionYMouse) {
        let _x = this.x - posicionXMouse;
        let _y = this.y - posicionYMouse;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    setearPosicion(x, y) {
        this.x = x;
        this.y = y;
    }

    getPosicion(){
        return {
            x: this.x, y: this.y
        };
    }

    setFueMovida(){
        this.fueMovida=true;
    }

    getFueMovida(){
        return this.fueMovida;
    }

    getJugador(){
        return this.jugador
    }
    

    animarCaida(casilla) {
        const { x: xFinal, y: yFinal } = casilla.getPosicion(); //Posición destino
        const xInicial = this.getPosicion().x; //Posición x de la ficha para mantenerla fija en el eje X mientras cae
    
        let velocidadY = 0;
        const gravedad = 0.6;
        const duracionRebote = 0.3;
    
        const mover = () => {
            //Calculo nueva posición en Y
            velocidadY += gravedad;
            let yActual = this.getPosicion().y + velocidadY;
    
            //Rebotar si alcanzó la casilla
            if (yActual >= yFinal + casilla.getTamanio() / 2) {
                yActual = yFinal + casilla.getTamanio() / 2; //Para que la ficha no se pase
                velocidadY *= -duracionRebote; // Simula el rebote
    
                if (Math.abs(velocidadY) < 0.5) { //Si la velocidad es ínfima, la ficha se dejó de mover (llegó)
                    this.setearPosicion(xInicial, yFinal + casilla.getTamanio() / 2); // Asegura la posición final exacta
    
                    let cordenadasCasilla = casilla.getPosicion(); //obtengo las cordenadas de la casilla para mover la ficha a esa posicion
                    this.setearPosicion(cordenadasCasilla.x + casilla.getTamanio() / 2, cordenadasCasilla.y + casilla.getTamanio() / 2) //seteo la ficha en la posicion de la casilla, sumo el tamanio /2 para centarla vertical y horizontalmente
    
                    return; // Termina la animación
                }
            }
    
            this.setearPosicion(xInicial, yActual); //Ubica la ficha en la casilla
            redibujar();
            requestAnimationFrame(mover); //Llamado recursivo a la animación hasta que la ficha llegue al destino
        }
    
        mover();
    }   
}