// Initialize the map

// Add a tile layer

const mapElement = document.getElementById('map');

// Add a marker

const tourLocations = JSON.parse(mapElement.dataset.locations);
const tourStartLocation = JSON.parse(mapElement.dataset.startLocation);
console.log(tourLocations, tourStartLocation);

const map = L.map('map').setView(
    [tourStartLocation.coordinates[1], tourStartLocation.coordinates[0]],
    5
);
// var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
}).addTo(map);

L.marker([tourStartLocation.coordinates[1], tourStartLocation.coordinates[0]], {
    title: tourStartLocation.description,
})
    .addTo(map)
    .bindPopup(
        L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `map-popup-content`,
        })
    )
    .setPopupContent(`Start-Location\n${tourStartLocation.description}`)
    .openPopup();
tourLocations.forEach((tourLocation) => {
    console.log(tourLocation);
    L.marker([tourLocation.coordinates[1], tourLocation.coordinates[0]], {
        title: tourLocation.description,
    })
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `map-popup-content`,
            })
        )
        .setPopupContent(`${tourLocation.description}`)
        .openPopup();
});
