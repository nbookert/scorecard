function switchBar(feature){
    // updates the bar graph to to show 
    // the selected feature from the dropdown menu 

    $('#bar-div').empty()

    // This grabs the name of the selected school
    let school = $('#rank').text().replace(/[0-9.]/g, ''); 
    barchart(feature,school);
}

function updateBar(feature,school){
    // updates the bar graph when a new school
    // is selected from the list
    $('#bar-div').empty()
    barchart(feature,school);
}

function barchart(feature, selected) {
    // draws the bar graph in bar graph area

    let div_area = d3.select("#bar-div")
    div_width = div_area.node().getBoundingClientRect().width
    div_height =div_area.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 30, left: 40},
        width =  div_width - margin.left - margin.right,
        height =  div_height - margin.top - margin.bottom;

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

    var url = 'http://localhost:8080/hbcu/institution-data';

    let xMap = function(d) { return x(d.NAME); };
    let yMap = function(d) { return y(d[feature]); };
    let hMap = function(d) { return height - y(d[feature]); };
    let topten_names =[];

    d3.json(url).then(function(data){
        data.sort(function(a, b) { return b.SCORE - a.SCORE; });
        topten = data.slice(0,10)

        topten.forEach(function(d){
            topten_names.push(d.NAME)
        })
        let inTopTen =  topten_names.indexOf(selected)
        if(inTopTen == -1 && selected != 'DEFAULT'){//Add the selected school to the chart
            data.forEach(function(d){
                if(d.NAME == selected){
                    topten.push(d);
                }
            })
        }

        topten.sort(function(a, b) { return a[feature] - b[feature]; });  
        x.domain(topten.map(function(d){return d.NAME}));
        y.domain([0, d3.max(topten, function(d){return d[feature]})]);

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
            .data(topten)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x",xMap )
            .attr("width", x.bandwidth())
            .attr("y",yMap )
            .attr("height", hMap)
            .style("fill",function(d){if(d.NAME ==selected){ return "red";}  else { return "steelblue";}});
            // .on("mouseover", function(d) {
            //     Tooltip
            //     .style("opacity", 1)
            //     d3.select(this)
            //     .style("stroke", "black")
            //     .style("opacity", .5)
            //     Tooltip
            //     .html("Testing " + d[feature])
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
        // var Tooltip = d3.select("#div_template")
        //     .append("div")
        //     .style("opacity", 0)
        //     .attr("class", "tooltip")
        //     .style("background-color", "white")
        //     .style("border", "solid")
        //     .style("border-width", "2px")
        //     .style("border-radius", "5px")
        //     .style("padding", "5px")
}