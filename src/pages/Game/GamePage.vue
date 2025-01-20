<template>
    <canvas id="canvas"></canvas>
</template>
<script>
import { start, getRandomWordList } from './GameCode/Game'; 
export default{
    name: "GamePage",
    components: {

    },
         data(){
             return {
                 clientId: "",
                 redirectURI: "",
                 canvas: null,
                 game: null,
                 ctx: null,
             };
         },
    async mounted(){
         window.addEventListener("resize", this.updateCanvasSize);
         this.canvas = document.getElementById('canvas');
         this.ctx = this.canvas.getContext("2d");
         this.canvas.width = document.body.offsetWidth;
         this.canvas.height = document.body.offsetHeight;
         this.game = await start(this.canvas.width, this.canvas.height, this.ctx);
         this.ctx.font = "30px Arial";
         this.ctx.fillStyle= "white";
         this.ctx.fillText("test", 10, 150);
         window.addEventListener("keypress", this.letterClicked);
         window.requestAnimationFrame(this.runGame);
     },
     methods: {
      letterClicked(e){
        this.game.letterClicked(e, this.game);
      },
      runGame(){
        this.clearRectangle();
         this.game.drawWords();
         window.requestAnimationFrame(this.runGame);
        },
         clearRectangle(){
             this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
         },
      updateCanvasSize(){
         this.canvas.width = document.body.offsetWidth;
         this.canvas.height = document.body.offsetHeight;
      },
     },
}
</script>