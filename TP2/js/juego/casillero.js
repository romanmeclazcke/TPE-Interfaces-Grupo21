class Casillero {
    constructor(ctx, imgSrc,x,y,tamanio) {
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = imgSrc;
        this.x=x
        this.y=y
        this.fichaSeteada=null
        this.tamanioCelda=tamanio;
        this.imagenCargada = new Promise((resolve) => {
            this.img.onload = () => {
                resolve(); // Resuelvo la promesa cuando se termina de cargar la imagen
            };
        });
    }

    estaLibre() {
        return this.fichaSeteada==null;
    }

    setearFicha(ficha){
        this.fichaSeteada=ficha;
    }

    async draw() {
        await this.imagenCargada;
        this.ctx.drawImage(this.img, this.x, this.y, this.tamanioCelda, this.tamanioCelda); 
    }
    
    drawFondo(){
        this.ctx.fillStyle='rgba(209, 209, 209, 0.8)'
        this.ctx.fillRect(this.x,this.y,this.tamanioCelda,this.tamanioCelda)//color del fondo de la casilla
    }
    getPosicion(){
        return {
            x:this.x,y:this.y
        }
    }

    getTamanio(){
        return this.tamanioCelda
    }

    getFicha(){
        
    }
}
