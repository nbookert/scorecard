//Width and height of map
var width = 960;
var height = 500;

var lowColor = '#4bb9d9'
var highColor = '#0e26d9'

// D3 Projection
var projection = d3.geo.albersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);                    // scale things down so see entire US

// Define path generator
var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
    .projection(projection);           // tell path generator to use albersUsa projection


// Define linear scale for output
var color = d3.scale.linear()
    .range(["rgb(213,222,217)","rgb(75,185,217)"]);

//Create SVG element and append map to the SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Append Div for tooltip to SVG
var div = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

// Load in my states data!

d3.csv("/data/stateslocated.csv", function(data) {
    color.domain([0,1]); // setting the range of the input data

    // Load GeoJSON data and merge with states data
    d3.json("/data/us-states.json", function(json) {

        // Loop through each state data value in the .csv file
        for (var i = 0; i < data.length; i++) {

            // Grab State Name
            var dataState = data[i].state;

            // Grab data value
            var dataValue = data[i].hbcus;

            // Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++)  {
                var jsonState = json.features[j].properties.name;

                if (dataState == jsonState) {

                    // Copy the data value into the JSON
                    json.features[j].properties.hbcus = dataValue;

                    // Stop looking through the JSON
                    break;
                }
            }
        }

        // Bind the data to the SVG and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function(d) {

                // Get data value
                var value = d.properties.hbcus;

                if (value) {
                    //If value exists…
                    return color(value);
                } else {
                    //If value is undefined…
                    return "rgb(213,222,217)";
                }
            });
    });

    // Connection to MongoDB
    var url = 'http://localhost:8080/hbcu/institution-data';

    // d3.csv("data/hbcus-list.csv").then(function(data){
    d3.json(url, function(data) {

        data.forEach(function(d){
            d.LONGITUDE = parseFloat(d.LONGITUDE);
            d.LATITUDE = parseFloat(d.LATITUDE);
        });

        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                console.log(d.NAME, projection([d.LONGITUDE, d.LATITUDE]));
                if (projection([d.LONGITUDE, d.LATITUDE]))
                    return projection([d.LONGITUDE, d.LATITUDE])[0];
            })
            .attr("cy", function(d) {
                if (projection([d.LONGITUDE, d.LATITUDE]))
                    return projection([d.LONGITUDE, d.LATITUDE])[1];
            })
            .attr("r", 4)
            .style("fill", "rgb(217,34,12)")
            .style("opacity", 0.85)

            .on("mouseover", function(d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.text(d.NAME)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })

            // fade out tooltip on mouse out
            .on("mouseout", function(d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });

    // add a legend
    var w = 140, h = 300;

    var key = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "legend");

    var legend = key.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", highColor)
        .attr("stop-opacity", 1);

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", lowColor)
        .attr("stop-opacity", 1);

    key.append("rect")
        .attr("width", w - 100)
        .attr("height", h)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    var y = d3.scale.linear()
        .range([h, 0])
        .domain([minVal, maxVal]);

    var yAxis = d3.axisRight(y);


    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,10)")
        .call(yAxis)
});