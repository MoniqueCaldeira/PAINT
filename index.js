const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const inputColor = document.querySelector('.input__color');
const tools = document.querySelectorAll('.button__tool');
const sizeButtons = document.querySelectorAll('.button__size');
const buttonClear = document.querySelector('.button__clear');

let brushSize = 10;
let isPaining = false;

let activeTool = "brush";

inputColor.addEventListener("change", ({ target }) => {
   ctx.fillStyle = target.value
});

canvas.addEventListener("mousedown", (event) => {
   const { clientX, clientY } = event;
   isPaining = true;
   if (activeTool === "brush") {
      draw(clientX, clientY);
   }
   if (activeTool === "rubber") {
      erase(clientX, clientY);
   }
})

canvas.addEventListener("mouseup", (event) => {
   isPaining = false;
})

canvas.addEventListener("mousemove", ({ clientX, clientY }) => {
   if (isPaining && activeTool === "brush") {
      draw(clientX, clientY);
   }
   if (isPaining && activeTool === "rubber") {
      erase(clientX, clientY);
   }
})

const draw = (x, y) => {
   ctx.globalCompositeOperation = "source-over"
   ctx.beginPath()
   ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
   ctx.fill();
   //ctx.fillRect(x - canvas.offsetLeft, y - canvas.offsetTop,brushSize, brushSize);
}

const erase = (x, y) => {
   ctx.globalCompositeOperation = "destination-out";
   ctx.beginPath()
   ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
   ctx.fill();
   //ctx.fillRect(x - canvas.offsetLeft, y - canvas.offsetTop,brushSize, brushSize);
}


tools.forEach((tool) => {
   tool.addEventListener("click", ({ target }) => {
      //#Closest vai buscar um elemento que está mais próximo do target (button-tools)
      const selectedTool = target.closest("button");
      const action = selectedTool.getAttribute("data-action");
      if (action) {
         tools.forEach((tool) => {
            tool.classList.remove("active");
         })
         activeTool = action;
         selectedTool.classList.add("active");
      }
   })
})

sizeButtons.forEach((buttons) => {
   buttons.addEventListener("click", ({ target }) => {
      //#Closest vai buscar um elemento que está mais próximo do target (button-buttons)
      const selectedButton = target.closest("button");
      const size = selectedButton.getAttribute("data-size");

      sizeButtons.forEach((buttons) => {
         buttons.classList.remove("active");
         brushSize = size;
         selectedButton.classList.add("active");
      })
   })
})


buttonClear.addEventListener("click",()=>{
   ctx.clearRect(0, 0, canvas.width,canvas.height);
})