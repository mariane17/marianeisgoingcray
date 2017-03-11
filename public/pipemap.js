var map = new google.maps.Map(d3.select(".box-panel-map").node(), {
  zoom: 12,
  draggableCursor: 'crosshair',
  center: new google.maps.LatLng(53.7217, -113.1917),
  mapTypeId: google.maps.MapTypeId.TERRAIN,
  backgroundColor: "white",
  mapMaker: 'True',
  styles: [
  {
    featureType: "all",
    elementType: "labels",
    stylers: [{ visibility: "off" }]
  }
  ]
});

// Load the pipemap data. When the data comes back, create an overlay.
d3.json("pipes.json", function(data) {
  var overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
      .attr("class", "pipemap");
                            
    // Draw each marker as a separate SVG element.
    overlay.draw = function() {
      var projection = this.getProjection(),
        padding = 10;
      
      var color = d3.scale.linear()
        .domain([0, 1])
        .range(["blue", "red"]);   
                  
	  var tooltip = d3.select("body")
        .append("div")
    	.attr("class", "tooltip")
    	.style("opacity", 0);
      					  		
      var marker = layer.selectAll("svg")
        .data(d3.entries(data))
        .each(transform) // update existing markers 
        .enter().append("svg:svg")
          .each(transform)
          .attr("class", "marker");
     
      // Add a circle.
      marker.append("circle")
        .attr("r", 5)
        .attr("cx", padding)
        .attr("cy", padding)
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
         // tooltip.html('Population: '+d.key+'<br>'+'Allele Frequencey: '+d.value[2].toPrecision(3))
          tooltip.html('Company:'+d.key+'')
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      	})
     	.on("mouseout", function(d) {
          tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      });
      
      function transform(d) {
      	
        pos = new google.maps.LatLng(d.value[0], d.value[1]);
        pos = projection.fromLatLngToDivPixel(pos);
        return d3.select(this)
          .style("left", (pos.x - padding) + "px")
          .style("top", (pos.y - padding) + "px")
          .attr('fill', color(d.value[2]))     
      }
    };
  };

  // Bind our overlay to the map…
  overlay.setMap(map);
});