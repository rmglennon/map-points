var map = L.map("map").setView([39.74739, -105], 13);

L.esri.basemapLayer("Topographic").addTo(map);

var coorsField = {
    "type": "Feature",
    "properties": {
        "popupContent": "Hello"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404191970824, 39.756213909328125]
    }
};

//marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

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
}

L.geoJSON(coorsField, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: onEachFeature
}).addTo(map);