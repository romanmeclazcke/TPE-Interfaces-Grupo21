class Casillero {
    constructor(ctx, isOcupado, imgSrc,x,y,tamanio) {
        this.ctx = ctx;
        this.isOcupado = isOcupado;
        this.img = new Image();
        this.img.src = imgSrc;
        this.x=x
        this.y=y
        this.tamanioCelda=tamanio;
        this.imagenCargada = new Promise((resolve) => {
            this.img.onload = () => {
                resolve(); // Resuelvo la promesa cuando se termina de cargar la imagen
            };
        });
    }

    isOcupado() {
        return this.isOcupado;
    }

    async draw() {
        await this.imagenCargada; 
        this.ctx.drawImage(this.img, this.x, this.y, this.tamanioCelda, this.tamanioCelda); 
    }
}
