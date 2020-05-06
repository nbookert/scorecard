
function compute_hbcu(){
    var url = 'http://localhost:8080/hbcu/institution-data';
    var hbcu =0, i=0;
    d3.json(url).then(function(data){
        data.forEach(function(d) {
            if(d.SCORE){
                hbcu += +d.SCORE;
                i++;
            }
        });
        hbcu=hbcu/i

    d3.select("#rank")
    .append("p")
    .append("text")
    .text(hbcu.toFixed(2))
    }).catch(function(error){
        console.log(error);
    });
        
}
