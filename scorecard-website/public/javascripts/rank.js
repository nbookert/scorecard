var hbcu =0;
function compute_hbcu(){
    let sdata=[]
    let i =0;
    var url = 'http://localhost:8080/hbcu/institution-data';

    d3.json(url).then(function(data){
        data.forEach(function(d) {
            if(i=1)
                hbcu = d.ADM_RATE;
                i++;
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
