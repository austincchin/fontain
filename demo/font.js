import createLoop from 'canvas-loop'

var size = 512;
var letterNum = document.getElementById("letter").value;
var mesh;
var A = {char:"A", mesh:{}, X:1, Y:1};
var B = {char:"B", mesh:{}, X:1, Y:1};
var G = {char:"G", mesh:{}, X:1, Y:1};
var Q = {char:"Q", mesh:{}, X:1, Y:1};
var letters = [A, B, G, Q];
var path = 'demo/svg/singleChar/' + letters[letterNum].char + '.svg';
var word = "";//AGGQ";

const fs = require('fs');
var extractPath = require('extract-svg-path').parse;
var loadSvg = require('load-svg');
var createMesh = require('../');
var drawTriangles = require('draw-triangles-2d');
let files = fs.readdirSync(__dirname + '/svg/singleChar')
  .filter(file => /\.svg$/.test(file));



var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');

canvas.width = size;
canvas.height = size;

loadSvg(path, function (err, svg) {
  if (err) throw err;
  var svgPath = extractPath(svg);
  mesh = createMesh(svgPath, {
    scale: 1,
    simplify: 0.01
  })
  render();
})

document.getElementById("sliderX").onchange = function(event) {
    letters[letterNum].X = event.target.value;
    //console.log(letters[letterNum].X);
    render();
};

document.getElementById("sliderY").onchange = function(event) {
    letters[letterNum].Y = event.target.value;
    //console.log(letters[letterNum].Y);
    render();
};

document.getElementById("letter").onchange = function(event) {
    letterNum = event.target.value;
    path = 'demo/svg/singleChar/' + letters[letterNum].char + '.svg';
    //console.log(path);
    loadSvg(path, function (err, svg) {
      if (err) throw err;
      var svgPath = extractPath(svg);
      mesh = createMesh(svgPath, {
        scale: 1,
        simplify: 0.01
      })
    render();
    })
};

function render () {
  context.clearRect(0, 0, size, size);
  context.save();
  console.log(letters);

  var center;
  if (word.length>0) {
    var i = 0;
    var scale = size / (word.length*2);
    while (i<word.length) {
      console.log("hey");      
      var temp;
      var j = 0;
      var num;
      while(j<letters.length) {
        if (letters[j].char == word[i]) {
          num = j;
          console.log(num);
          break;
        }
        j++;
      }
      loadSvg('demo/svg/singleChar/' + word[i] + '.svg', function (err, svg) {
        if (err) throw err
        console.log(i);
        var svgPath = extractPath(svg);
        temp = createMesh(svgPath, {
          scale: 1,
          simplify: 0.01
        })
        console.log(i);
        console.log(temp);
        context.save();
        context.translate(((size/2)+20*i), (size/2));
        context.scale(scale/letters[num].X, -scale/letters[num].Y);
        context.beginPath();
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.lineWidth = 2 / scale;
        drawTriangles(context, temp.positions, temp.cells);
        context.fillStyle = '#d86c15';
        context.strokeStyle = '#3b3b3b';
        context.fill();
        context.stroke();
        context.restore();
      });
      i++;
      }
  }

  else {
    var scale = size / 2;
    context.translate(size/2, size/2);
    context.scale(scale/letters[letterNum].X, -scale/letters[letterNum].Y);
    context.beginPath();
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.lineWidth = 2 / scale;
    drawTriangles(context, mesh.positions, mesh.cells);
    context.fillStyle = '#d86c15';
    context.strokeStyle = '#3b3b3b';
    context.fill();
    context.stroke();
    context.restore();
  }
  
}

document.body.appendChild(canvas);