/** The user should be able to drag a rectangle with the mouse to mark the part of the image that should be exported as a detail shot.
 Once a selection has been made it should be possible to move it by dragging the rectangle with the mouse, and to resize it by dragging the resize handles on the corners. */

/** STEPS FOR THE SOLUTION
//  * 1. create a canvas
//  * 2. to draw image on canvas after being loaded
//  * 3. create a frame at initial position as being specified in the task
//  * 4. add framed image to a new canvas
//  * 5. opacity of the frame to 1 - not done
//  * 6. resizing - not done
//  */

//Drawing the main image in canvas
var canvas = document.getElementById('canvas');

var ctx = canvas.getContext('2d');
const image = new Image();
image.onload = drawImageActualSize;
image.src = './image.png';
function drawImageActualSize() {
  canvas.width = this.naturalWidth;
  canvas.height = this.naturalHeight;
  canvas.style.opacity = '.5';

  ctx.drawImage(this, 0, 0);
  drawNewCanvas();
}

//A new canvas for the selected part of the image (being called inside drawImageActualSize())
function drawNewCanvas() {
  var canvas = document.getElementById('newCanvas');
  var ctx = canvas.getContext('2d');
  canvas.width = 150;
  canvas.height = 180;
  ctx.drawImage(image, 250, 290, 150, 200, 5, 5, 150, 180); //drawing the initial image with same specs as frame
}

//Mouse events on the frame
const frame = document.getElementById('frame');
frame.addEventListener('mousedown', mousedown);

function mousedown(e) {
  window.addEventListener('mousemove', mousemove);
  window.addEventListener('mouseup', mouseup);
  let prevX = e.clientX; //retaining current x,y as prev coordinates
  let prevY = e.clientY;

  function mousemove(e) {
    let newX = prevX - e.clientX; //calculating new coordinates
    let newY = prevY;
    console.log('new' + prevX, prevY);
    const rect = frame.getBoundingClientRect();
    frame.style.left = rect.left - newX + 'px';
    frame.style.top = newY + 'px';
    prevX = e.clientX;
    prevY = e.clientY;
  }

  function mouseup(e) {
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
    var canvas = document.getElementById('newCanvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 150;
    canvas.height = 180;
    ctx.drawImage(image, e.clientX, e.clientY, 150, 220, 5, 5, 150, 180);
  }
}
