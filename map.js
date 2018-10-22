var map = L.map("map").setView([37.75, -122.23], 10);

L.esri.basemapLayer("Topographic").addTo(map);

var marker = L.marker([37.7814318,-122.4030528,]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);