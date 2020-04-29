var hbcu =0;
function compute_hbcu(){
    let sdata=[]

    var url = 'http://localhost:8080/hbcu/institution-data';

        d3.json(url).then(function(data){

        data.forEach(function(d) {
                hbcu+=d.TUITIONFEE_IN
        });
    d3.select("#rank")
    .append("p")
    .append("text")
    .style("font-size","large")
    .text(hbcu)
    }).catch(function(error){
        console.log(error);
    });
        
}