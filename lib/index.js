// TODO: Create a function to get the coordinates
// from an address and display a map with a marker on it
const form = document.querySelector("form");
const coordinatesDisplay = document.querySelector("p");

const showMap = (userInput) => {
  // TODO: Construct the URL (with apiKey & userInput)
  // and make the fetch request to the mapbox API
  const apiKey = "pk.eyJ1Ijoic29sZW5va28iLCJhIjoiY200M2t2Z3RwMGNqaTJ3cHY3d2k0dzhoMCJ9.-2I0NhvLttioSxU6ATyrxw";
  mapboxgl.accessToken = apiKey;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userInput)}.json?access_token=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      // TODO: Insert the info into the DOM
      // - Extract the coordinates from the parsed JSON response (lang, lat)
      const [longitude, latitude] = data.features[0].center;
      // - Display the coordinates in the element where the coordinates will be displayed
      coordinatesDisplay.textContent = `Longitude: ${longitude}, Latitude: ${latitude}`;
      // - Create a map using the Mapbox API and the coordinates
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v9",
        center: [longitude, latitude],
        zoom: 12,
      });
      // - Add a marker to the map at the coordinates
      new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
};
//
// TODO: Select the form element
// TODO: Add event listener to the form that:
// - Prevents the default form submission behavior
// - Get the user input
// - Calls the showMap function with the user input as an argument
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = form.querySelector("input[type='text']").value;
  showMap(userInput);
});
