/*
// our utility functions
var createGeometry = require('three-simplicial-complex')(THREE);
var svgMesh3d = require('svg-mesh-3d');

// our SVG <path> data
var svgPath = 'M305.214,374.779c2.463,0,3.45,0.493...';

// triangulate to generic mesh data
var meshData = svgMesh3d(svgPath);

// convert the mesh data to THREE.Geometry
var geometry = createGeometry(meshData);

// wrap it in a mesh and material
var material = new THREE.MeshBasicMaterial({
  side: THREE.DoubleSide,
  wireframe: true
});

var mesh = new THREE.Mesh(geometry, material);

// add to scene
scene.add(mesh);*/

var loadSvg = require('load-svg');
var parsePath = require('extract-svg-path').parse;
var Svgmesh3d = reqire('svg-mesh-3d');

loadSVG('svg/A.svg',function(err,svg){
	if (err) throw err;

	var svgPath = parsePath(svg);
	var mesh = svgMesh3d(svgPath,{delaunay: false, scale: 4;})
})