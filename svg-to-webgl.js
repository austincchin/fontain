var loadSvg = require('load-svg');
var parsePath = require('extract-svg-path').parse;
var SvgMesh3d = reqire('svg-mesh-3d');
var SvgToLoad = 'svg/A.svg';

loadSVG(SvgToLoad,function(err,svg){
	if (err) throw err;

	var svgPath = parsePath(svg);
	var mesh = svgMesh3d(svgPath,{delaunay: false, scale: 4;})
})