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
    const matchArray = findMatches(event.target.value, cities);
        matchArray.forEach(p=> {
            let markers = [];
            if (p.hasOwnProperty('geocoded_column_1')) {
                const point = p.geocoded_column_1
                const latlong = point.coordinates
                const marker = latlong.reverse()
                markers.push(marker)
                console.log(markers)
            }

        })
    
    
    
    
    
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

