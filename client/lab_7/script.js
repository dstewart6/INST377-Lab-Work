async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const arrayName = await request.json();
  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function findMatches(wordToMatch, cities) {
    return cities.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.category.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      return `
                <ul>
                    <li><div class="name">${place.name}</div></li>
                    <div class="category">${place.category}</div>
                    <div class="address">${place.address_line_1}</div>
                    <div class="city">${place.city}</div>
                    <div class="zip">${place.zip}</div>
                </ul>
                <br>
                `;
    }).join('');
    if (event.target.value === '') {
      suggestions.innerHTML = '';
    } else {
      suggestions.innerHTML = html;
    }
  }
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;

        function mapInit() {
    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    var marker = L.marker([51.5, -0.09]).addTo(mymap);

    var circle = L.circle([51.508, -0.11], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(mymap);

    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(mymap);

    }