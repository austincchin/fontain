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
scene.add(mesh);