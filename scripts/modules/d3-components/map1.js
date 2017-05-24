
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = $('#chart2-container').width() - margin.left - margin.right;
var height = 600;
var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";

var map1 = d3.select("#map1-container")
			.append("svg")
			.attr("width", width)
			.attr("height", height);
    
var projection = d3.geoMercator()							// Setting the projection
  					.scale(width / 2 / Math.PI) 			// Setting the scale (default 1000, smaller = shrinks, larger = expands)
					.translate([width / 2, height / 2])		// Transation (?)

var path = d3.geoPath()										// Building the path
      		 .projection(projection);						// Building the projection
    
    
d3.json(url, function(err, geojson) {
	map1.append("path")
	.attr("d", path(geojson))
});
