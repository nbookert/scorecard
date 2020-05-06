function switchLine(school){
    $('#line').empty()
    linegraph(school);
}
function linegraph(school){
    let tryit = d3.select("#line")
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

    let svg = d3.select("#line").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let line =d3.line()
    .x(function(d){return x(d.YEAR);})
    .y(function(d){return y(d.SCORE);})
    let score_data=[]
    var year = 'http://localhost:8080/hbcu/score?year=20162017';
    var year2 = 'http://localhost:8080/hbcu/score?year=20172018';
    var year3 = 'http://localhost:8080/hbcu/score?year=20182019';
    var year4 = 'http://localhost:8080/hbcu/score?year=20152016';
    
    Promise.all([
        d3.json(year4),
        d3.json(year),
        d3.json(year2),
        d3.json(year3),
        ]).then(function(data){
        for(let i = 0; i<data.length;i++){
            data[i].forEach(function(d){
                if(d.NAME == school){
                    d.YEAR = parseDate(d.YEAR.slice(4))
                    let placeholder = {NAME : d.NAME, SCORE : d.SCORE, YEAR : d.YEAR}
                    score_data.push(placeholder)
                }
            }) 
        }

        x.domain(d3.extent(score_data, function(d){return d.YEAR;}));
        y.domain(d3.extent(score_data, function(d){return d.SCORE;}));

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

        svg.append("path")
       .datum(score_data)
       .attr("class","line")
       .attr("d",line)
       .style("fill","none")
       .style("stroke","steelblue");

    });
}