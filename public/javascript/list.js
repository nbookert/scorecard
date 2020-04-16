function show_list(){
    let sdata=[]
    d3.csv("data/hbcus-list.csv").then(function(data){
        data.forEach(function(d) {
            d.years=+d.years
            if(d.years==2){
                 d3.select("#list-div")
                .append("p")
                .append("text")
                .style("font-size","small")
                .text(d.place)
            }
        });
    }).catch(function(error){
        console.log(error);
    });
}
    