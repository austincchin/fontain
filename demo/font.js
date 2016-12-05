import createLoop from 'canvas-loop'

var size = 400;
var letterNum = document.getElementById("letter").value;
var mesh;
var A = {char:"A", mesh:{}, X:1, Y:1};
var B = {char:"B", mesh:{}, X:1, Y:1};
var C = {char:"C", mesh:{}, X:1, Y:1};
var D = {char:"D", mesh:{}, X:1, Y:1};
var E = {char:"E", mesh:{}, X:1, Y:1};
var F = {char:"F", mesh:{}, X:1, Y:1};
var G = {char:"G", mesh:{}, X:1, Y:1};
var H = {char:"H", mesh:{}, X:1, Y:1};
var I = {char:"I", mesh:{}, X:1, Y:1};
var J = {char:"J", mesh:{}, X:1, Y:1};
var K = {char:"K", mesh:{}, X:1, Y:1};
var L = {char:"L", mesh:{}, X:1, Y:1};
var M = {char:"M", mesh:{}, X:1, Y:1};
var N = {char:"N", mesh:{}, X:1, Y:1};
var O = {char:"O", mesh:{}, X:1, Y:1};
var P = {char:"P", mesh:{}, X:1, Y:1};
var Q = {char:"Q", mesh:{}, X:1, Y:1};
var R = {char:"R", mesh:{}, X:1, Y:1};
var S = {char:"S", mesh:{}, X:1, Y:1};
var T = {char:"T", mesh:{}, X:1, Y:1};
var U = {char:"U", mesh:{}, X:1, Y:1};
var V = {char:"V", mesh:{}, X:1, Y:1};
var W = {char:"W", mesh:{}, X:1, Y:1};
var X = {char:"X", mesh:{}, X:1, Y:1};
var Y = {char:"Y", mesh:{}, X:1, Y:1};
var Z = {char:"Z", mesh:{}, X:1, Y:1};
var letters = [A, B, C, D, E, F, G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z];
var path = 'demo/svg/singleChar/' + letters[letterNum].char + '.svg';
var word = "";//AGGQ";
var wInput = "";
var wList = [];

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
    word = "";
    path = 'demo/svg/singleChar/' + letters[letterNum].char + '.svg';
    //console.log(path);
    //word = word + letters[letterNum].char;
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

document.getElementById("wordInput").onchange = function(event) {
    wInput = event.target.value;
    word = "";
    var index = 0;
    while (index < wInput.length){
      var cNum = wInput.charCodeAt(index)-97;

      if (cNum >= 0 && cNum <= 25){
        word += letters[cNum].char;
      }
      index += 1;
    }
    console.log(word);
    render();

};

function render () {
  context.clearRect(0, 0, size, size);
  context.save();
  //console.log(letters);

  var center;
  if (word.length>0) {
    var i = 0;
    var scale = size / (word.length*3); //scale to fit onto page
    var offset = 0;
    while (i<word.length) {             //iterate through word
      console.log("hey, i = " + i + "/" + (word.length-1));      
      var temp;
      var num;
      num = word.charCodeAt(i)-65;
      console.log(num + " (" + letters[num].char + ")");

      
      
      loadSvg('demo/svg/singleChar/' + word[i] + '.svg', function (err, svg) {
        //var html = await getRandomPonyFooArticle();
        console.log("index: " + i);
        if (err) throw err
        //console.log(i);
        var svgPath = extractPath(svg);
        temp = createMesh(svgPath, {
          scale: 1,
          simplify: 0.01
        })

        var x_trans = (512/word.length-50)+((130-(4*word.length))*offset);

        console.log(i);
        console.log(temp);
        context.save();
        context.translate(x_trans, (size/2));
        console.log("translated " + word[offset] +  " to x: " + x_trans);
        context.scale(scale/letters[num].X, -scale/letters[num].Y);
        context.beginPath();
        context.lineJoin = 'round';
        context.lineCap = 'round';
        context.lineWidth = 2 / scale;
        drawTriangles(context, temp.positions, temp.cells);
        context.fillStyle = '#000000';
        context.strokeStyle = '#000000';
        context.fill();
        context.stroke();
        context.restore();
        offset += 1;
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
    context.fillStyle = '#000000';
    context.strokeStyle = '#000000';
    context.fill();
    context.stroke();
    context.restore();
  }
  
}

document.body.appendChild(canvas);