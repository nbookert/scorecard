function linegraph(){
    let tryit = d3.select("#otherscore")
    test = tryit.node().getBoundingClientRect().width
    test2 =tryit.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  test - margin.left - margin.right,
        height =  test2 - margin.top - margin.bottom;

    let parseDate = d3.timeParse("%Y");
    let x = d3.scaleTime()
    .range([0,width]);

    let y =d3.scaleLinear()
        .range([height,0])

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let svg = d3.select("#otherscore").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let line =d3.line()
        .x(function(d){return x(d.SAT_AVG);})
        .y(function(d){return y(d.ADM_RATE);})

    var url = 'http://localhost:8080/hbcu/institution-data';

    d3.json(url).then(function(data){
        
        data.forEach(function(d){
            d.SAT_AVG=parseDate(d.SAT_AVG)
        })
        x.domain(d3.extent(data, function(d){return d.SAT_AVG;}));
        y.domain(d3.extent(data, function(d){return d.ADM_RATE;}));

    svg.append("g")
        .attr("class","x-axis")
        .attr("transform","translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class","y-axis")
        .call(yAxis)
        .append("text")
        .attr("transform","rotate(-90)")
        .attr("y",6)
        .attr("dy",".71em")
        .attr("class","label")
        .style("text-anchor","end")
        .style("fill","black")
        .text("Temp")

        svg.append("path")
        .datum(data)
        .attr("class","line")
        .attr("d",line)
        .style("fill","none")
        .style("stroke","steelblue");

    });
}