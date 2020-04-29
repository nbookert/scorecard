function map() {
    var margin = {
        top: 0,
        bottom: 30,
        left: 0,
        right: 20
    }, width = parseInt(d3.select('#map-div').style('width'))
        , height = parseInt(d3.select('#map-div').style('height'))
        , width = width - margin.left - margin.right
        , mapRatio = 0.5
        , height = width * mapRatio
        , active = d3.select(null);

    var svg = d3.select('#map-div').append('svg')
        .attr('class', 'center-container')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right);

    svg.append('rect')
        .attr('class', 'background center-container')
        .attr('height', height + margin.top + margin.bottom)
        .attr('width', width + margin.left + margin.right)
        .on('click', clicked);


    Promise.resolve(d3.json('/data/us-counties.topojson'))
        .then(ready);

    var projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2])
        .scale(1000);

    var path = d3.geoPath()
        .projection(projection);

    var g = svg.append("g")
        .attr('class', 'center-container center-items us-state')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)

    function ready(us) {

        g.append("g")
            .attr("id", "counties")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.counties).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "county-boundary")
            .on("click", reset);

        g.append("g")
            .attr("id", "states")
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features)
            .enter().append("path")
            .attr("d", path)
            .attr("class", "state")
            .on("click", clicked);


        g.append("path")
            .datum(topojson.mesh(us, us.objects.states, function (a, b) {
                return a !== b;
            }))
            .attr("id", "state-borders")
            .attr("d", path);

        var url = 'http://localhost:8080/hbcu/institution-data';

        // d3.csv("data/hbcus-list.csv").then(function(data){
        d3.json(url).then(function (data) {

            data.forEach(function (d) {
                d.LONGITUDE = parseFloat(d.LONGITUDE)
                d.LATITUDE = parseFloat(d.LATITUDE)
            });

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function (d) {
                    if (projection([d.LONGITUDE, d.LATITUDE]))
                        return projection([d.LONGITUDE, d.LATITUDE])[0];
                })
                .attr("cy", function (d) {
                    if (projection([d.LONGITUDE, d.LATITUDE]))
                        return projection([d.LONGITUDE, d.LATITUDE])[1];
                })
                .attr("r", 4)
                .style("fill", "rgb(217,34,12)")
                .style("opacity", 0.85)

                .on("mouseover", function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.text(d.NAME)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })

                // fade out tooltip on mouse out
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
        });
    }

    function clicked(d) {
        if (d3.select('.background').node() === this) return reset();

        if (active.node() === this) return reset();

        active.classed("active", false);
        active = d3.select(this).classed("active", true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        g.transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
    }


    function reset() {
        active.classed("active", false);
        active = d3.select(null);

        g.transition()
            .delay(100)
            .duration(750)
            .style("stroke-width", "1.5px")
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    }

}