class Ficha {
    constructor(ctx, color, jugador, x, y, radio, imgSrc) {
        this.ctx = ctx;
        this.color = color;
        this.jugador = jugador;
        this.x = x;
        this.y = y;
        this.radio = radio;
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
}