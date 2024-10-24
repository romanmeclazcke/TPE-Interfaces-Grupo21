class Hints{
    constructor(ctx,x,y,tamanio,imgSrc){
        this.ctx=ctx
        this.x=x
        this.y=y
        this.tamanio=tamanio
        this.img = new Image();
        this.img.src = imgSrc;
        this.imagenCargada = new Promise((resolve) => {
            this.img.onload = () => {
                resolve();
            };
        });
        this.visible = false;
    }

    async draw(){//dibujo la imagen del hint
        await this.imagenCargada;
        
        if (this.visible) {
            this.ctx.drawImage(this.img, this.x, this.y, this.tamanio, this.tamanio);
        }
        
    }

    estaDentro(fichaX, fichaY) {//verifico si la posicion donde solte la ficha esta dentro del area del hint
        if (fichaX >= this.x && fichaX <= this.x + this.tamanio && fichaY >= this.y &&fichaY <= this.y + this.tamanio ) {
            return true; //retorno true si esta dentro
        }
        return false; //retorno false si esta afuera
    }

    mostrar() {
        this.visible = true;
    }

    ocultar() {
        this.visible = false;
    }
    
}