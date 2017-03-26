var map = new google.maps.Map(d3.select(".box-panel-map").node(), {
  zoom: 12,
  draggableCursor: 'crosshair',
  center: new google.maps.LatLng(54.52936037,-117.46484254),
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

var url ="https://marianeisgoingcray.mybluemix.net/select_single_map";

d3.json(url, function(data) {
  data.forEach(function(d){
  	d.LAT= +d.LAT___DEG_DEC_NAD_83_; 
        d.LONG = +d.LONG___DEG_DEC_NAD_83___UTM_ZONE_11_;
        })

     // console.log(data);
  var overlay = new google.maps.OverlayView();

  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
      var layer = d3.select(this.getPanes().overlayMouseTarget).append("div")
      .attr("class", "pipemap");
                            
    // Draw each marker as a separate SVG element.
      overlay.draw = function() {
    	 
      var projection = this.getProjection(),
        padding = 10;

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
        //.attr("r", 3)
        .attr("r", function(d) {
        	var radius;
                         if (d.value.GFLAG === 0) { radius = 3;
                         } else if (d.value.GFLAG === 1) { radius = 9; }
                         return radius;
                       })
        .attr("cx", padding)
        .attr("cy", padding)
        .style("fill", function(d) {
        	var returnColor;
                         if (d.value.GFLAG === 0) { returnColor = "green";
                         } else if (d.value.GFLAG === 1) { returnColor = "red"; }
                         return returnColor;
                       })
        .style("opacity", 0.9)
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
         // tooltip.html('Population: '+d.key+'<br>'+'Allele Frequencey: '+d.value[2].toPrecision(3))
         tooltip.html('Feature-Type: '+d.value.FEATURE_NUMBER+' </br> Comment: '+d.value.COMMENTS+ '')
            .style("left", (d3.event.pageX + 5) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
      	})
     	.on("mouseout", function(d) {
          tooltip.transition()
          .duration(200)
          .style("opacity", 0);
      	  });
      	  
      function transform (d) {
		//console.log(d);
            var googleCoordinates = new google.maps.LatLng(d.value.LAT,  d.value.LONG);
            var pos = projection.fromLatLngToDivPixel(googleCoordinates);
            return d3.select(this)
	          .style("left", (pos.x - padding) + "px")
	          .style("top", (pos.y - padding) + "px");
	          //.attr('fill', color(d.value[2]))     
          }


        }; //end of "overlay.draw()""
      }; //end of "overlay.onAdd()""
   overlay.setMap(map);
}); //end json data read








        
        
        
        
        
        
