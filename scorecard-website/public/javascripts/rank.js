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
    .text("Average Score")
    .append("p")
    .append("text")
    .text(hbcu.toFixed(2));
    }).catch(function(error){
        console.log(error);
    });
        
}

function updateCharts(school){
    updateRank(school);
    // switchLine(school); 
    updateBar('SCORE', school); //change highlighted bar
        // barchart('SCORE','Rust College');
    //- barchart('SCORE',"Albany State University");
    // updateMap(school); //zooms into the school on the map
}

function updateRank(school){
    var url = 'http://localhost:8080/hbcu/score?year=20182019';
    d3.json(url).then(function(data){
        data.forEach(function(d) {
            if(d.NAME == school){
                d3.select("#rank")
                .select("p")
                .text(d.NAME)
                .append("p")
                .text(d.SCORE.toFixed(2));
                console.log("In update Name from data", d.NAME);
            }
        });
    })
}