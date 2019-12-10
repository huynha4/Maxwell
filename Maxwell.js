
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

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

canvas.addEventListener('touchmove', function(e) {
  mouse.x = touch.clientX;
  mouse.y = touch.clientY;
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
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('touchstart', function(e) {
  ctx.beginPath();
  ctx.moveTo(mouse.x, mouse.y);

  canvas.addEventListener('touchmove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('touchend', function() {
  canvas.removeEventListener('touchmove', onPaint, false);
}, false);
 
var onPaint = function(e) {
  e.preventDefault();  
  ctx.globalAlpha = 1;
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

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

