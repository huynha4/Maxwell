
//
//
// Paint Canvas JS
//
//

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = 542;
canvas.height = 403;

var mouse = {x: 0, y: 0};
 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

var img = new Image();
img.src = "images/Coke_Sign.png";
img.onload = function() {
    ctx.drawImage(img, 0, 0);
    ctx.strokeStyle = '#FF0000';
}

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.globalCompositionOperation = "destination-out";
 
canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
 
    canvas.addEventListener('mousemove', onPaint, false);
}, false);
 
canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);
 
var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

function updateColor() {
  var dropdown = document.getElementById('color-dropdown');
  ctx.strokeStyle = dropdown.options[dropdown.selectedIndex].value;
}

function toggleColor(event) {
  var image = event.target;
  image.classList.toggle("withColor");
}

