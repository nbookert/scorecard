function stackedbarchart(){

    let tryit = d3.select("#bar-div")
    test = tryit.node().getBoundingClientRect().width
    test2 =tryit.node().getBoundingClientRect().height
    let margin = {top: 20, right: 20, bottom: 60, left: 40},
        width =  test - margin.left - margin.right,
        height =  test2 - margin.top - margin.bottom;

    let svg = d3.select("#bar-div").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let x = d3.scaleBand()
        .rangeRound([0, width])
        .padding(0.1);

    let y = d3.scaleLinear()
        .range([height, 0]);

    let xAxis = d3.axisBottom(x);
    let yAxis = d3.axisLeft(y);

    let car_data = [];
    let median_value = [];

    this.highlightBar = function(name){
        d3.select("#" + name).style("fill", "red");
        // show the label
        // d3.select("#bar" + i).text(d.value);
    }
    this.dehighlightBar = function(name){
        d3.select("#" + name).style("fill", "steelblue");
        // show the label
        // d3.select("#bar" + i).text(d.value);
    }
    d3.csv("data/a1-cars.csv").then(function (data) {
        let car_map = new Map();

        data.forEach(function (d) {
            let cnt = car_map.get(d.Manufacturer);
            if (cnt == undefined)
                cnt = 1;
            else
                cnt += 1;
            car_map.set(d.Manufacturer, cnt);
        });

        let iterator = car_map.keys();

        for (let i = 0; i < car_map.size; i++) {
            let key = iterator.next().value;
            car_data.push({"manufacturer": key, "value": +car_map.get(key)})
        }

        x.domain(car_data.map(function (d) {
            return d.manufacturer;
        }));
        y.domain([0, d3.max(car_data, function (d) {
            return d.value;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.50em")
            .attr("transform", "rotate(-90)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Count");

        let bars = svg.selectAll(".bar")
            .data(car_data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function (d) {
                return "translate(" + x(d.manufacturer) + ", " + y(d.value) + ")";
            });

        bars.append("rect")
            .attr("id", function(d){
                return d.manufacturer;
            })
        // .attr("x", function(d) { return x(d.manufacturer); })
            .attr("width", x.bandwidth())
            // .attr("y", function(d) { return y(d.value); })
            .attr("height", function (d) {
                return height - y(d.value);
            })
            .on("mouseover", function (d, i) {
                highlightBar(d.manufacturer);
                // highlight(d.manufacturer);
            })
            .on("mouseleave", function (d, i) {
                dehighlightBar(d.manufacturer);
                // dehighlight();
                // hide the label
            });


        bars.append("text")
            .text(function (d) {
                // return d.value;
            })
            .attr("id", function (d, i) {
                return "bar" + i;
            })
            // .attr("x", function(d){
            //     return x(d.manufacturer);
            // })
            // .attr("y", function(d) { return y(d.value); })
            .style("text-anchor", "end")
            .attr("dx", "-.1em")
            .attr("dy", "1.5em")
            .attr("transform", "rotate(-90)")
        // .style("visibility", "hidden");

    })
        .catch(function (error) {
            console.log(error);
        });

}