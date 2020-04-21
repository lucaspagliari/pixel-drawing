// const colorPicker = require('./picker');

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const marginLeft = 8;
const marginTop = 50;
const canvasWidth = 400;
const canvasHeight = 400;
const boardLength = 12;
const pixelWidth = canvasWidth / boardLength;
const pixelHeight = canvasHeight / boardLength;

let selectedColor = "#111";
let mousedown = false;
let enable = true;

canvas.addEventListener("mousemove", paintBox);
canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  paintBox(e);
});
canvas.addEventListener("mouseup", () => mousedown = false);


canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.strokeStyle = "#000";
ctx.lineWidth = 1;
function drawBoard() {
  ctx.rect(0, 0, canvasWidth, canvasHeight);
  ctx.stroke();
  for (let i = 0; i < boardLength; i++) {
    const posX = Math.round(i * pixelWidth) + .5
    const posY = Math.round(i * pixelHeight) + .5
    if (i * pixelHeight == 0) {
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(0, posY);
    ctx.lineTo(500, posY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(posX, 0);
    ctx.lineTo(posX, 500);
    ctx.stroke();
  }
}

function paintBox(e) {
  if (!enable) return;
  if (!mousedown) return;
  e.preventDefault();
  const coordX = Math.floor((e.clientX - marginLeft) / pixelWidth * .99);
  const coordY = Math.floor((e.clientY - marginTop) / pixelHeight * .99);
  const positionX = (coordX * pixelWidth);
  const positionY = (coordY * pixelHeight);
  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;
  ctx.fillRect(positionX, positionY, pixelWidth, pixelHeight)
  ctx.strokeRect(positionX, positionY, pixelWidth, pixelHeight)
}

drawBoard();


const pickr = Pickr.create({
  el: '.color-picker',
  theme: 'nano', // or 'monolith', or 'nano'

  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
  ],

  components: {
    preview: true,
    opacity: true,
    hue: true,
    palette: true,
    interaction: {
      hex: true,
      rgba: true,
      input: true,
    }
  }
});
pickr.on('init', () => {
  // pickr.setColor(selectedColor);
});
pickr.on('change', color => selectedColor = color.toHEXA().toString());
pickr.on('show', () => enabled = false);
pickr.on('hide', () => setTimeout(() => { enabled = true }, 300))