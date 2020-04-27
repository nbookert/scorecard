function barchart() {

    let tryit = d3.select("#bar-div")
    test = tryit.node().getBoundingClientRect().width
    test2 =tryit.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  test - margin.left - margin.right,
        height =  test2 - margin.top - margin.bottom;

    let svg = d3.select("#bar-div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    
    let y = d3.scaleLinear()
        .range([height, 0]);
    
    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    let yvar = "lat";
    selected = "Rust College";

    d3.csv("data/hbcus-list.csv").then(function(data){
        data.forEach(function(d){
            d.years=+d.years;
            d.lat=parseFloat(d.lat);
            d.lon=parseFloat(d.lon);
        });
    
        data.sort(function(a, b) { return a[yvar] - b[yvar]; });  
        x.domain(data.map(function(d){return d.place}));
        y.domain([0, d3.max(data, function(d){return d[yvar]})]);

        // svg.append("g")
        //     .attr("class", "x axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(xAxis)
        //     .selectAll("text")
        //     .style("text-anchor", "end")
        //     .attr("dx", "-.8em")
        //     .attr("dy", "-.50em")
        //     .attr("transform", "rotate(-90)" );
    
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Count");
    
        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.place); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d[yvar]); })
            .attr("height", function(d) { return height - y(d[yvar]); })
            .style("fill",function(d){if(d.place ==selected){return "red";}  else {return "steelblue";}})
            .on("mouseover", function(d) {
                Tooltip
                // .html("The exact value of<br>this cell is: " + d.value)
                .style("opacity", 1)
                d3.select(this)
                .style("stroke", "black")
                .style("opacity", 1)
            })
            .on("mouseleave",function(d) {
                Tooltip
                  .style("opacity", 0)
                d3.select(this)
                  .style("stroke", "none")
                  .style("opacity", 0.8)
              });

        var Tooltip = d3.select("#div_template")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")
    })
    .catch(function(error){
        console.log(error);
    });
}