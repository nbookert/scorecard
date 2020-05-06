function display_avgScore(){
    // calculates the average median score for HBCUs
    // Display the result in the appropriate area

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
    // called when a user selects a school
    // updates the other areas of the page

    updateRank(school);
    switchLine(school); 
    updateBar('SCORE', school);
    // updateMap(school); //zooms into the school on the map
}

function updateRank(school){
    // when a user selects a school the
    // section is updated to show the school 
    // name and its 2018-2019 scores

    var url = 'http://localhost:8080/hbcu/score?year=20182019';
    d3.json(url).then(function(data){
        data.forEach(function(d) {
            if(d.NAME == school){
                d3.select("#rank")
                .select("p")
                .text(d.NAME)
                .append("p")
                .text(d.SCORE.toFixed(2));
            }
        });
    })
}