"use strict";
window.onload = init;

// GLOBALS
var canvas,ctx,dragging=false,lineWidth,strokeStyle;

// CONSTANTS
var DEFAULT_LINE_WIDTH = 10;
var DEFAULT_STROKE_STYLE = "red";


// FUNCTIONS
function init()
{
  // initialize some globals
  canvas = document.querySelector('#sketch');
  ctx = canvas.getContext('2d');
  lineWidth = DEFAULT_LINE_WIDTH;
  strokeStyle = DEFAULT_STROKE_STYLE;
  // set initial properties of the graphics context
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.lineCap = "round"; // "butt", "round", "square" (default "butt")
  ctx.lineJoin = "round"; // "round", "bevel", "miter" (default “miter")

  // Hook up event listeners
  canvas.onmousedown = doMousedown;
  canvas.onmousemove = doMousemove;
  canvas.onmouseup = doMouseup;
  canvas.onmouseout = doMouseout;
}

// EVENT CALLBACK FUNCTIONS
function doMousedown(e){
  dragging = true;
  // get location of mouse in canvas coordinates
  var mouse = getMouse(e);
  // PENCIL TOOL
  ctx.beginPath();
  // move pen to x,y of mouse
  ctx.moveTo(mouse.x, mouse.y);
}

function doMousemove(e) {
  // bail out if the mouse button is not down
  if(! dragging) return;
  // get location of mouse in canvas coordinates
  var mouse = getMouse(e);
  // PENCIL TOOL
  // set ctx.strokeStyle and ctx.lineWidth to correct global values
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  // draw a line to x,y of mouse
  ctx.lineTo(mouse.x, mouse.y);
  // stroke the line
  ctx.stroke();
}

function doMouseup(e) {
  // console.log(e.type);
  dragging = false;
  ctx.closePath();
}

// if the user drags out of the canvas
function doMouseout(e) {
  // console.log(e.type);
  dragging = false;
  ctx.closePath();
}

function doClear() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function doExport(){
  // open a new window and load the image in it
  // http://www.w3schools.com/jsref/met_win_open.asp
  var data = canvas.toDataURL();
  var windowName = "canvasImage";
  var windowOptions = "left=0,top=0,width=" + canvas.width + ",height=" + canvas.height +",toolbar=0,resizable=0";
  var myWindow = window.open(data,windowName,windowOptions);
  myWindow.resizeTo(canvas.width,canvas.height); // needed so Chrome would display image
 }


// UTILITY FUNCTIONS
/*
These utility functions do not depend on any global variables being in existence,
and produce no "side effects" such as changing ctx state variables.
They are "pure functions" - see: http://en.wikipedia.org/wiki/Pure_function
*/

// Function Name: getMouse()
// returns mouse position in local coordinate system of element
// Author: Tony Jefferson
// Last update: 3/1/2014
function getMouse(e){
  var mouse = {}
  mouse.x = e.pageX - e.target.offsetLeft;
  mouse.y = e.pageY - e.target.offsetTop;
  return mouse;
}

/*
Function Name: drawGrid()
Description: Fills the entire canvas with a grid
Last update: 9/1/2014
*/
function drawGrid(ctx, color, cellWidth, cellHeight){
  // save the current drawing state as it existed before this function was called
  ctx.save()

  // set some drawing state variables
  ctx.strokeStyle = color;
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = 0.5;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // vertical lines all set!
  for (var x = cellWidth + 0.5; x < ctx.canvas.width; x += cellWidth) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, ctx.canvas.height);
    ctx.stroke();
  }

  /*
    Need horizontal lines!
    You write it!
  */
  for (var y = cellHeight + 0.5; y < ctx.canvas.height; y += cellHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(ctx.canvas.width, y);
    ctx.stroke();
  }


  // restore the drawing state
  ctx.restore();
}
