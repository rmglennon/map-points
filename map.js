var map = L.map("map")
    .setView([37.7877, -122.4232], 14);
var basemap = L.esri.basemapLayer("Topographic").addTo(map);


var geojsonMarkerOptions = {
    radius: 12,
    fillColor: "#ff69b4",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
    // captures click on existing feature
    layer.on("click", function (e) {
        console.log("meow")
    });
}

var popup = L.popup();

var marker = L.marker();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    marker
        .setLatLng(e.latlng)
        .addTo(map);

    // non-working attempts to do a post request with latlng    
    // var data = {
    //     lat: e.latlng.lat,
    //     lng: e.latlng.lng
    // }

    // $.ajax({
    //     type: "POST",
    //     url: "point-map.geojson",
    //     data: data,
    //     success: function() {
    //         console.log("posted some data")
    //     },
    //     dataType: "json"
    //   });
}

map.on('click', onMapClick);

var points = $.ajax({
    url: "point-map.geojson",
    dataType: "json",
    success: console.log("geojson data successfully loaded."),
    error: function (xhr) {
        alert(xhr.statusText)
    }
})
// Specify that this code should run once the data request is complete
$.when(points).done(function () {
    //L.geoJSON(points.responseJSON).addTo(map);
    let myPoint = L.geoJSON(points.responseJSON, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
});