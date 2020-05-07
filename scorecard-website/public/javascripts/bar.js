function switchBar(feature){
    // updates the bar graph to to show 
    // the selected feature from the dropdown menu 

    $('#bar-div').empty()
    // $('select').value('SCORE')
    $("option[value=SCORE]").attr('selected', 'selected');
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
    
            let bars = svg.selectAll(".bar")
            .data(topten)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d){
                return "translate(" + x(d.NAME) + ", " + y(d[feature]) + ")";
            });
    
            bars.append("rect")
            .attr("width",x.bandwidth())
            .attr("height",function(d){ return height - y(d[feature]); })
            .style("fill",function(d){if(d.NAME ==selected){ return "red";}  else { return "steelblue";}});
    
            bars.append("text")
            .style("text-anchor","end")
            .attr("dx","-.1em")
            .attr("dy","1.5em")
            .attr("transform","rotate(-90)")
            .text(function(d){return d.NAME;})
        

    })
    .catch(function(error){
        console.log(error);
    });

}