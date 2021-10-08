async function windowActions({
    const endpoint = '';
    const cities = [];
    const request = await fetch(endpoint)
        .then(blob => blob.json())
        .then(data => cities.push(...data))
        const arrayName = await request.json()
    function findMatches(wordToMatch, cities) {
        return cities.filter(place => {

            const regex = new RegExp(wordToMatch, 'gi');
            return place.city.match(regex) || place.state.match(regex)

        });
    }

    function numberWithCommas(x) {
        return x.toString().repace(/\B(?=(d{3})+(?!\d))/g,',')
    }

    function displayMatches(event){
        const matchArray = findMatches(this.value, cities);
        const html = matchArray.map(place => {
            const regex = new RegExp(event.target.value, 'gi');
            const cityName = place.city.replace(regex, `<span class='h1>${event.target.value}</span>`);
            const stateName = place.state.replace(regex, `<span class='h1>${event.target.value}</span>`);
            return `
                <li>
                    <span class='name'>${cityName}, ${stateName}</span>
                    <span class='population'>${numberWithCommas(place.population)}</span>
                </li>
            `;
        }).join('');
        suggestions.innerHTML = html;
    }

    const searchInput = document.querySelector('.search');
    const searchInput = document.querySelector('.suggestions');

    searchInput.addEventListener('change', displayMatches);
    searchInput.addEventListener('keyup', (evt) => { displayMatches(evt) });

    window.onload = windowActions;
})