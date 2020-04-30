$(document).ready(function() {

    //testURL("http://localhost:8080/hbcu/institution-data");
    //testURL("http://localhost:8080/hbcu/admissions-rate");
    //testURL("http://localhost:8080/hbcu/average-act");
    //testURL("http://localhost:8080/hbcu/enrollment");
    //testURL("http://localhost:8080/hbcu/location");
    //testURL("http://localhost:8080/hbcu/graduation-rate");
    //testURL("http://localhost:8080/hbcu/tuition");
    //testURL("http://localhost:8080/hbcu/publicprivate");
    //testURL("http://localhost:8080/hbcu/average-sat");
    //testURL("http://localhost:8080/hbcu/website");
   // testURL("http://localhost:8080/hbcu/score");

    // xhttp = new XMLHttpRequest();
    // url = "http://localhost:8080/all/mean-values";
    // xhttp.open("GET", url, true);
    // xhttp.setRequestHeader("Content-Type", "application/json");
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         let response = JSON.parse(this.response);
    //         console.log(response)
    //
    //     }
    // };
    // xhttp.send();

});

function testURL(url) {
    //Connect to MongoDb
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            console.log(response)

        }
    };
    xhttp.send();
}