const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const inputColor = document.querySelector('.input__color');
const tools = document.querySelectorAll('.button__tool');
const sizeButtons = document.querySelector('.button__size');
const buttonClear = document.querySelector('.button__clear');

let brushSize = 10;
ctx.fillStyle = "#000"
let isPaining = false;

canvas.addEventListener("mousedown", (event)=>{
   const {clientX, clientY} = event;
   draw(clientX, clientY);
   isPaining = true;
})

canvas.addEventListener("mouseup", (event)=>{
   isPaining = false;
})

canvas.addEventListener("mousemove", ({clientX, clientY})=>{
   if(isPaining){
      draw(clientX, clientY);
   }
})

const draw = (x,y) =>{
   ctx.beginPath()
   ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize/2, 0, 90);
   ctx.fill();
   //ctx.fillRect(x - canvas.offsetLeft, y - canvas.offsetTop,brushSize, brushSize);
}
