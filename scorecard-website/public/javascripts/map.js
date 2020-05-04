function map() {
    var map = L.map('map-div').setView([35.8283, -95.5795], 4);
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
            console.log(hbcu.WEBSITE);
            markers.addLayer(markerArray[i] = L.marker([hbcu.LATITUDE, hbcu.LONGITUDE]).bindPopup('<a href="' + hbcu.WEBSITE + '" target="_blank">' + hbcu.NAME + '</a>')
            );
        }
        map.addLayer(markers);
    }



    map.on('dragend', getPins);
    map.on('zoomend', getPins);
    map.whenReady(getPins)


}
