var sortValue;
function sortList(elem){
    sortValue=elem;
    console.log("I hope this works", sortValue);
    if(sortValue == "abc"){
        data.sort(function(a, b) { return a.NAME - b.NAME; });  
        console.log("Sorting by abc");
    }else{
        data.sort(function(a, b) { return b.SCORE - a.SCORE; });  
        console.log("sorting by rank")
    }
};
function show_list(){
    var url = 'http://localhost:8080/hbcu/institution-data';

        d3.json(url).then(function(data){
        let svg = d3.select("#full-list")
        let margin = {top: 20, right: 20, bottom: 30, left: 40};
        
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
                d3.selectAll("text").style("background-color","white")
                d3.select(this).style("background-color","yellow")
                updateCharts(d.NAME);
            });
            // .on("mouseup",function(){
            //     d3.select(this).style("color","black")
            // })

    }).catch(function(error){
        console.log(error);
    });
}
    