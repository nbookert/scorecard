var map = L.map('map-div').setView([35.8283, -95.5795], 4);

function initiate_map() {

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(map);

    function getPins(e) {
        bounds = map.getBounds();
        url = "http://localhost:8080/hbcu/institution-data";
        $.get(url, pinTheMap, "json")
    }

    function pinTheMap(data) {
        var markers = new L.markerClusterGroup({
            showCoverageOnHover: false,
            maxClusterRadius: 50
        });

        //clear the current pins
        map.removeLayer(markers);

        //add the new pins
        var markerArray = new Array(data.length)
        for (var i = 0; i < data.length; i++) {
            hbcu = data[i];

            markers.addLayer(markerArray[i] = L.marker([hbcu.LATITUDE, hbcu.LONGITUDE]).bindPopup('<a href="' + hbcu.WEBSITE + '" target="_blank">' + hbcu.NAME + '</a>')
            );
        }
        map.addLayer(markers);
    }



    map.on('dragend', getPins);
    map.on('zoomend', getPins);
    map.whenReady(getPins)


}

function map_zoom(institution_name) {
    let url = "http://localhost:8080/hbcu/institution-data";

    //Connect to MongoDb
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.response);
            let index = 0;

            for (let i = 0; i < response.length; i++) {
                if (response[i].NAME == institution_name) {
                    index = i;
                }
            }

            let latlng = L.latLng(response[index].LATITUDE, response[index].LONGITUDE);
            let zoom = 16;
            let pan_options = {animate: true};
            map.setView(latlng, zoom, pan_options);


        }
    };
    xhttp.send();
}
