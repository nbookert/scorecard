var hbcu =0;
function compute_hbcu(){
    let sdata=[]
    d3.csv("data/hbcus-list.csv").then(function(data){
        data.forEach(function(d) {
            d.years=+d.years

            if(d.years==4){
                hbcu++;

            }
            

        });
    d3.select("#hbcuscore")
    .append("p")
    .append("text")
    .style("font-size","large")
    .text(hbcu)
    }).catch(function(error){
        console.log(error);
    });
        
}