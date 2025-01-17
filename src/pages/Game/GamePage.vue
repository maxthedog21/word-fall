<template>
    <canvas id="canvas"></canvas>
</template>
<script>
export default{
    name: "GamePage",
    components: {

    },
         data(){
             return {
                 clientId: "",
                 redirectURI: "",
                 canvas: null,
                 ctx: null,
             };
         },
     mounted(){
       //  this.start();
         window.addEventListener("resize", this.updateCanvasSize);
         this.canvas = document.getElementById('canvas');
         this.ctx = this.canvas.getContext("2d");
         this.canvas.width = document.body.offsetWidth;
         this.canvas.height = document.body.offsetHeight;
         this.ctx.font = "30px Arial";
         this.ctx.fillStyle= "white";
         this.ctx.fillText("test", 10, 180);
         //this.generateStars(128);

         this.last = this.timestamp();
        // window.requestAnimationFrame(this.runStars);
     },
     methods: {
      updateCanvasSize(){
         this.canvas.width = document.body.offsetWidth;
         this.canvas.height = document.body.offsetHeight;
      },
     },
}
</script>