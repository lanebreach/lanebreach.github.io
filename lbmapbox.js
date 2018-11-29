var legend = document.getElementById('blocked-lane-legend');
legend.style.display = 'block';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYWdhZXNzZXIiLCJhIjoiY2pvZGY5bmh4MWJtcTNsbWtmN2RmNnhiNCJ9.iwOotv1u0S92o-Vj2CCjag';

var map = new mapboxgl.Map({
    // container id
    container: 'map',
    // stylesheet location
    style: 'mapbox://styles/agaesser/cjn5lb26b0gty2rnr3laj0ljd',
    // starting position [lng, lat]
    center: [-122.450577, 37.759108],
    // starting zoom
    zoom: 11
});

map.on('load', function() {

    document.getElementById("counter").innerHTML =
        `${map.queryRenderedFeatures({
            layers: ['bike-lane-reports-point']}).length
          } obstructed bike lanes since April 2018.`;

    map.on('click', 'bike-lane-reports-point', function(e) {
        let popupHTML = ``;

        if (e.features[0].properties.id) {
            popupHTML += `<b>ID:</b> ${e.features[0].properties.id}<br>`
        }

        if (e.features[0].properties.time) {
            popupHTML += `<b>Time:</b> ${e.features[0].properties.time}<br>`
        }

        if (e.features[0].properties.supervisor_district) {
            popupHTML += `<b>Supervisor District:</b> ${e.features[0].properties.supervisor_district}<br>`
        }

        if (e.features[0].properties.neighborhood) {
            popupHTML += `<b>Neighborhood:</b> ${e.features[0].properties.neighborhood}<br>`
        }

        if (e.features[0].properties.details) {
            popupHTML += `<b>Details:</b>             ${e.features[0].properties.details}<br>`
        }

        if (e.features[0].properties.media) {
            popupHTML += `<b>Media:</b>
                <br><img src="${e.features[0].properties.media}" style="width:256px;height:256px;"><br>`
        }

        new mapboxgl.Popup()
            .setLngLat(e.features[0].geometry.coordinates)
            .setHTML(popupHTML)
            .addTo(map);
    });

    map.on('mouseenter', 'bike-lane-reports-point', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'bike-lane-reports-point', function () {
        map.getCanvas().style.cursor = '';
    });
});

// text handlers
