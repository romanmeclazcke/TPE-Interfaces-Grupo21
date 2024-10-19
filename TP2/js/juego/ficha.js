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
    }

    draw() {
        // Dibujar el círculo
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.drawImage(this.img, this.x - this.radio, this.y - this.radio, this.radio * 2, this.radio * 2); //revisar el dibujar la imagen
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
