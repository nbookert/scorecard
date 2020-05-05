function updateCharts(school){
    // let score = 0;
    updateRank(school);
    // updateBar(school); //change highlighted bar
    // updateLine(school); 
    updateMap(school); //zooms into the school on the map
}

function updateRank(school){
        var url = 'http://localhost:8080/hbcu/score?year=20182019';
    d3.json(url).then(function(data){
        data.forEach(function(d) {
            if(d.NAME == school){
                d3.select("#rank").select("p")
                .text(d.SCORE.toFixed(2));
            }
        });
    })
}

// There has to be a better way to access variables to redraw bar graph
function updateBar(school){
    bar_y.domain([d3.min(test_data, yValue)-1, d3.max(test_data, yValue)+1]);
    d3.selectAll(".y axis")
    .call(yAxis)
    // .select(".label")
    // .text(ylabel)
    updateBars(school)
}

function updateBars(yvar){
    d3.selectAll(".bar")
    .transition()
    .duration(500)
    .attr("y", function(d) { return bar_y(d[yvar]); })
    .attr("height", function(d) { return height - bar_y(d[yvar]); })

}

// javascript file with misc functions
function sortList(elem){
    sortValue=elem;
    console.log("I hope this works", sortValue);
};