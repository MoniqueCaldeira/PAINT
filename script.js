const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const bgx = document.getElementById('MyCanvas');
const bgColor = document.querySelector('input.bg_color');

const inputColor = document.querySelector('.input__color');
const tools = document.querySelectorAll('.button__tool');
const sizeButtons = document.querySelectorAll('.button__size');
const buttonClear = document.querySelector('.button__clear');

let brushSize = 10;
let isPaining = false;

let activeTool = "brush";

inputColor.addEventListener('change', ({ target }) => {
   ctx.fillStyle = target.value;
});

bgColor.addEventListener('change', (event) => {
   bgx.style.backgroundColor = event.target.value;
});

// Verifica se há uma cor salva no Local Storage
if (localStorage.getItem('canvasBgColor')) {
   // Define a cor de fundo do canvas com base no valor armazenado no Local Storage
   bgx.style.backgroundColor = localStorage.getItem('canvasBgColor');
 }
 
 bgColor.addEventListener('change', (event) => {
    // Obtém o valor da cor selecionada
    const selectedColor = event.target.value;
    
    // Define a cor de fundo do canvas com a cor selecionada
    bgx.style.backgroundColor = selectedColor;
    
    // Armazena a cor selecionada no Local Storage
    localStorage.setItem('canvasBgColor', selectedColor);
 });

//função para verificar a ferramenta ativa e chamar a função apropriada
canvas.addEventListener('mousedown', (event) => {
   const { clientX, clientY } = event;
   isPaining = true;
   if (activeTool == "brush") {
      draw(clientX, clientY);
   }
   if (activeTool == "rubber") {
      erase(clientX, clientY);
   }
});

// Função para verificar se não está desenhando
canvas.addEventListener('mouseup', (event) => {
    isPaining = false;
});

//Função para apagar ou desenhar enquanto mouse se move
window.addEventListener('mousemove', function (e) {
    if (isPaining && activeTool == "brush") {
        draw(e.x, e.y);
    }
    if (isPaining && activeTool == "rubber") {
        erase(e.x, e.y);
    }
});

//função para desenhar
const draw = (x, y) => {
   ctx.globalCompositeOperation = "source-over"
   ctx.beginPath()
   ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
   ctx.fill();
};

//borracha
const erase = (x, y) => {
   ctx.globalCompositeOperation = "destination-out";
   ctx.beginPath()
   ctx.arc(x - canvas.offsetLeft, y - canvas.offsetTop, brushSize / 2, 0, 90);
   ctx.fill();
};

//altera ferramenta para ser usada
tools.forEach((tool) => {
   tool.addEventListener('click', ({ target }) => {
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
   });
});

//Altera o tamanho do pincel
sizeButtons.forEach((button) => {
   button.addEventListener('click', ({ target }) => {
      //#Closest vai buscar um elemento que está mais próximo do target (button-buttons)
      const selectedButton = target.closest("button");
      const size = selectedButton.getAttribute("data-size");

      sizeButtons.forEach((buttons) => {
         buttons.classList.remove("active");
         brushSize = size;
         selectedButton.classList.add("active");
      })
   });
})

buttonClear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width,canvas.height);
});