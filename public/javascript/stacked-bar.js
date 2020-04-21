function stackedbarchart(){

    let tryit = d3.select("#bar-div")
    test = tryit.node().getBoundingClientRect().width
    test2 =tryit.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  test - margin.left - margin.right,
        height =  test2 - margin.top - margin.bottom;

    let svg = d3.select("#bar-div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
        
    let x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05);

    let y = d3.scaleLinear()
        .rangeRound([height, 0]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);
    let color = d3.scaleOrdinal(d3.schemeSet1);
    let max_score=0;
    let score =0;

    d3.csv("data/hbcus-list.csv").then(function (data) {
        
        let keys = data.columns.slice(1);
        
        data.forEach(function (d) {
            d.lat= parseFloat(d.lat);
            d.lon = Math.abs(parseFloat(d.lon));
            d.years = +d.years;

                score = d.years + Math.abs(d.lon) + d.lat;
                if(score > max_score){
                    max_score=score;
                }
        });

        x.domain(data.map(function(d){return d.place}));
        y.domain([0, max_score]).nice();
        // color.domain(keys);

        svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill",function(d) { return color(d);})
        .selectAll("rect")
        .data(function(d){
            return d;
        })
        .enter().append("rect")
        .attr("x",function(d){return x(d.data.place);})
        .attr("y",function(d){return y(d[1]);})
        .attr("height", function(d){return y(d[0])-y(d[1]); })
        .attr("width",x.bandwidth())

        svg.append("g")
            .attr("class", "xaxis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
                .style("text-anchor","start")
                .attr("transform","rotate(45)");

        svg.append("g")
            .attr("class", "yaxis")
            .call(yAxis.ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start");

            // draw legend
        let legend = svg.selectAll(".legend")
        // .data(color.domain())
        .data(keys.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {return "translate(0," + i * 20 + ")"; });

        // draw legend colored rectangles
        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", color);

        // draw legend text
        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function(d) { return d;})

    })
        .catch(function (error) {
            console.log(error);
        });

}