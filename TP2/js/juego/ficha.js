class Ficha {

    constructor(ctx, color, jugador, x, y, radio,imgSrc) {
        this.ctx = ctx;
        this.color = color;
        this.jugador = jugador;
        this.x = x;
        this.y = y;
        this.radio = radio; 
        this.imgSrc = imgSrc;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI); 
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }


    estaSeleccionada(posicionXMouse, posicionYMouse) {
        let _x = this.x-posicionXMouse
        let _y = this.y-posicionYMouse
        return Math.sqrt(_x*_x*+_y*_y)<this.radio
    }

    setearPosicion(x,y){
        this.x=x
        this.y=y
    }

    
}
