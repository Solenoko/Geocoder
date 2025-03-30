// TODO: Create a function to get the coordinates
// from an address and display a map with a marker on it
const form = document.querySelector("form");
const coordinatesDisplay = document.querySelector("p");

const defaultLocation = [139.6917, 35.6895];
const apiKey = "pk.eyJ1Ijoic29sZW5va28iLCJhIjoiY200M2t2Z3RwMGNqaTJ3cHY3d2k0dzhoMCJ9.-2I0NhvLttioSxU6ATyrxw";
mapboxgl.accessToken = apiKey;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v9",
  center: defaultLocation,
  zoom: 4,
});

new mapboxgl.Marker()
  .setLngLat(defaultLocation)
  .addTo(map);

const showMap = (userInput) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userInput)}.json?access_token=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      const [longitude, latitude] = data.features[0].center;
      coordinatesDisplay.textContent = `Longitude: ${longitude}, Latitude: ${latitude}`;

      map.flyTo({
        center: [longitude, latitude],
        zoom: 12,
        speed: 1.2,
        curve: 1,
      });

      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = form.querySelector("input[type='text']").value;
  showMap(userInput);
});
