function show_list(){

    d3.csv("data/hbcus-list.csv").then(function(data){
        let svg = d3.select("#list-div")
        let margin = {top: 20, right: 20, bottom: 30, left: 40};

        svg.append("svg")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("p")
            .append("text")
            .text(function(d){return d.place})
            .style("font-size","small")
            .style("color","black")
            .on("mouseover",function(){
                d3.select(this).style("color","green")
            })
            .on("mouseleave",function(){
                d3.select(this).style("color","black")
            });

    }).catch(function(error){
        console.log(error);
    });
}
    