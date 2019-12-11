//
//
// Paint Canvas JS
//
//

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var imgcanvas = document.getElementById('imageCanvas');
var imgctx = imgcanvas.getContext('2d');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = 0;
canvas.height = 0;

var clientX;
var clientY;
 
canvas.addEventListener('mousemove', function(e) {
  clientX = e.pageX - this.offsetLeft;
  clientY = e.pageY - this.offsetTop;
}, false);

var img = new Image();
img.src = "images/CokeSignNoColor.jpg";
img.onload = function() {
  imgcanvas.width = img.width;
  imgcanvas.height = img.height;
  canvas.width = img.width;
  canvas.height = img.height;
  imgctx.drawImage(img, 0, 0);
  ctx.strokeStyle = '#BA5054';
  ctx.lineWidth = 7;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.globalCompositionOperation = "destination-out";
}
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(clientX, clientY);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function(e) {
  ctx.globalAlpha = 1;
    ctx.lineTo(clientX, clientY);
    console.log(clientX);
    console.log(clientY);
    ctx.stroke();
};

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas, e);
  var touch = e.touches[0];
  clientX = mousePos.x;
  clientY = mousePos.y;
  var mouseEvent = new MouseEvent("mousedown", {
    clientX: mousePos.x,
    clientY: mousePos.y
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
  var mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
  clientX: touch.clientX,
  clientY: touch.clientY
});

canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Image color/sections functions
function updateColor() {
  var dropdown = document.getElementById('color-dropdown');
  ctx.strokeStyle = dropdown.options[dropdown.selectedIndex].value;
}

function updateSize() {
  var sizedropdown = document.getElementById('size-dropdown');
  ctx.lineWidth = sizedropdown.options[sizedropdown.selectedIndex].value;
}

function updateOpacity() {
  var opacitydropdown = document.getElementById('opacity-dropdown');
  var colorCanvas = document.getElementById('myCanvas');
  colorCanvas.style.opacity = opacitydropdown.options[opacitydropdown.selectedIndex].value;
}

function toggleColor(event) {
  var image = event.target;
  image.classList.toggle("withColor");
}