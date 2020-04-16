function compute_hbcu(){
    let sdata=[]
    var hbcu =0;
    var other=0;
    d3.csv("data/hbcus-list.csv").then(function(data){
        data.forEach(function(d) {
            d.years=+d.years

            if(d.years==4){
                hbcu++;

            }else{
                other++;
            }
            

        });
    d3.select("#hbcuscore")
    .append("p")
    .append("text")
    .style("font-size","large")
    .text(hbcu)
    // .on("mouseover",)

    d3.select("#otherscore")
    .append("p")
    .append("text")
    .style("font-size","large")
    .text(other)

    }).catch(function(error){
        console.log(error);
    });
        
}