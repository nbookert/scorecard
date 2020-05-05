let bar_y;
let test_data=[];
let yValue;
let yAxis;
let height;
function barchart() {

    let tryit = d3.select("#bar-div")
    test = tryit.node().getBoundingClientRect().width
    test2 =tryit.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  test - margin.left - margin.right;
        height =  test2 - margin.top - margin.bottom;

    let svg = d3.select("#bar-div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    
    let yvar = "ENROLL";
    selected = "Rust College";
    yValue = function(d) { return +d[yvar];}; // data -> value
    let xValue = function(d) { return +d[NAME];}; // data -> value
        
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);
    
    bar_y = d3.scaleLinear()
        .range([height, 0]);
    
    let xAxis = d3.axisBottom(x);
    yAxis = d3.axisLeft(bar_y);

    var url = 'http://localhost:8080/hbcu/institution-data';


    let xMap = function(d) { return x(d.NAME); };
    let yMap = function(d) { return bar_y(d[yvar]); };
    let hMap = function(d) { return height - bar_y(d[yvar]); };

    // d3.csv("data/hbcus-list.csv").then(function(data){
    d3.json(url).then(function(data){
        test_data=data;
        // data.forEach(function(d){
        //     d.years=+d.years;
        //     d.LATITUDE=parseFloat(d.LATITUDE);
        //     d.LONGITUDE=parseFloat(d.LONGITUDE);
        // });
    
        data.sort(function(a, b) { return a[yvar] - b[yvar]; });  
        x.domain(data.map(function(d){return d.NAME}));
        // y.domain([d3.min(data, function(d){return d[yvar]})-1, d3.max(data, function(d){return d[yvar]})]);
        bar_y.domain([d3.min(data, yValue)-1, d3.max(data, yValue)]);

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
            .attr("x",xMap )
            .attr("width", x.bandwidth())
            .attr("y",yMap )
            .attr("height", hMap)
            .style("fill",function(d){if(d.NAME ==selected){return "red";}  else {return "steelblue";}});
            // .on("mouseover", function(d) {
            //     Tooltip
            //     .style("opacity", 1)
            //     d3.select(this)
            //     .style("stroke", "black")
            //     .style("opacity", .5)
            //     Tooltip
            //     .html("Testing " + d[yvar])
            //     .style("left", (d3.event.pageX + 5) + "px")
            //     .style("top", (d3.event.pageY - 28) + "px");
            // })
            // .on("mouseleave",function(d) {
            //     Tooltip
            //       .style("opacity", 0)
            //     d3.select(this)
            //       .style("stroke", "none")
            //       .style("opacity", 1)
            //   });

    })
    .catch(function(error){
        console.log(error);
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
}