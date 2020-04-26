$(document).ready(function() {

        //Connect to MongoDb
            let xhttp = new XMLHttpRequest();
            let url = "http://localhost:8080/hbcu/institution-data";
            xhttp.open("GET", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.response);
                    console.log(response)

                }
            };
            xhttp.send();

    xhttp = new XMLHttpRequest();
    url = "http://localhost:8080/all/mean-values";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            console.log(response)

        }
    };
    xhttp.send();

});

