

// There has to be a better way to access variables to redraw bar graph
function updateBar(school){
    // call this from dropdown box
    yValue = function(d) { return +d[school];}
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