function show_list(){
    // creates the list of HBCU schools
    // sorts by the 2018-2019 median scores

    var url = 'http://localhost:8080/hbcu/institution-data';
        d3.json(url).then(function(data){
            let svg = d3.select("#full-list");
            
            data.sort(function(a, b) { return b.SCORE - a.SCORE; });

            svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("p")
            .attr("class","schoollist")
            .attr("id",function(d){
                return d.NAME;
            })
            .append("text")
            .text(function(d){return d.NAME})
            .style("font-size","small")
            .style("color","black")
            .on("mousedown",function(d){
                updateCharts(d.NAME);
            });

    }).catch(function(error){
        console.log(error);
    });
}
    