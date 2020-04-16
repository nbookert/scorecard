function show_list(){
    let sdata=[]
    d3.csv("data/hbcus-list.csv").then(function(data){
        data.forEach(function(d) {
            d.years=+d.years
            d.place = d.place
            d.lat=parseFloat(d.lat)
            d.lon=parseFloat(d.lon)

        });

        sdata=data;
        for(var i=0;i<sdata.length;i++){
            if(sdata[i].years == 2){
                d3.select("#list-div")
                .append("p")
                .append("text")
                .style("font-size","small")
                .text(sdata[i].place)
            }
        }
    }).catch(function(error){
        console.log(error);
    });
}
    