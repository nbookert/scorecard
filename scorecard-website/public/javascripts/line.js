function switchLine(school){
    // updates the line graph to show
    // the change in the selected school's 
    // median score from 2015-2016 to 2018-2019

    $('#line').empty()
    linegraph(school);
}

function linegraph(school){
    // draws the line graph for in the line graph area
    // The default line graph shows the change of the
    // average scores from 2015-2016 to 2018-2019

    let div_area = d3.select("#line")
    div_width = div_area.node().getBoundingClientRect().width
    div_height =div_area.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  div_width - margin.left - margin.right,
        height =  div_height - margin.top - margin.bottom;

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
    let average=0;
    let placeholder;
    let d_year;

    Promise.all([
        d3.json(year4),
        d3.json(year),
        d3.json(year2),
        d3.json(year3),
        ]).then(function(data){
        for(let i = 0; i<data.length;i++){
                let j = 0;
            data[i].forEach(function(d){
                if(school =='ALL'){ //Default view for line graph
                    if(d.SCORE){
                        if(j==0){
                            d_year = parseDate(d.YEAR.slice(4))
                        }
                        average += d.SCORE;
                        j++;
                    }
                }else{
                    if(d.NAME == school){
                    d.YEAR = parseDate(d.YEAR.slice(4))
                    placeholder = {NAME : d.NAME, SCORE : d.SCORE, YEAR : d.YEAR}
                    }
                }
            })
            if(average > 0){
                average=average/j
                placeholder = {SCORE : average, YEAR : d_year}
                average=0;
            }
            score_data.push(placeholder)
        }
        
        x.domain(d3.extent(score_data, function(d){return d.YEAR;}));
        y.domain([0,d3.max(score_data, function(d){return d.SCORE;})]);

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
       .style("stroke","steelblue")
       .style("stroke-width","2");

    });
}