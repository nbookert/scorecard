var sortValue;

function sortList(elem){
    sortValue=elem;
    console.log("I hope this works", sortValue);
    if(sortValue == "abc"){
        data.sort(function(a, b) { return a.lat - b.lat; });  
        console.log("Sorting by abc");
    }else{
        data.sort(function(a, b) { return a.years - b.years; });  
        console.log("sorting by rank")
    }
};
function show_list(){

    d3.csv("data/hbcus-list.csv").then(function(data){
        let svg = d3.select("#full-list")
        let margin = {top: 20, right: 20, bottom: 30, left: 40};

        
            //rank by default
            data.sort(function(a, b) { return a.years - b.years; });  

            //  or "rank"
            svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("p")
            .append("text")
            .text(function(d){return d.place})
            .style("font-size","small")
            .style("color","black");
            // .on("mouseover",function(){
            //     d3.select(this).style("color","green")
            // })
            // .on("mouseleave",function(){
            //     d3.select(this).style("color","black")
            // });

    }).catch(function(error){
        console.log(error);
    });
}
    