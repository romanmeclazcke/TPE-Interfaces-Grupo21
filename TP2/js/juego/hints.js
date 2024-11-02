class Hints {
    constructor(ctx, x, y, tamanio, radio) {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.tamanio = tamanio
        this.visible = false;
        this.radio = radio
    }

    draw() {
        if (this.visible) {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
            this.ctx.closePath();
            this.ctx.strokeStyle = '#FA7800'; // Establece el color acento para el borde
            this.ctx.stroke(); // Dibuja solo el borde del círculo
        }
    }

    estaDentro(fichaX, fichaY) {//verifico si la posicion donde solte la ficha esta dentro del area del hint
        let _x = this.x - fichaX;
        let _y = this.y - fichaY;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    }

    mostrar() {
        this.visible = true;
    }

    ocultar() {
        this.visible = false;
    }

    getPosicion() {
        return { x: this.x, y: this.y }
    }

}