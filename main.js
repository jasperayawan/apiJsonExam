const displayData = document.getElementById('display-data');
const searchInput = document.getElementById('input_search');

const fetchData = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = await response.json();
    const rates = data.rates;

    const renderRates = (ratesData) => {
      displayData.innerHTML = '';

      Object.keys(ratesData).forEach((key) => {
        const { name, unit, value, type } = ratesData[key];

        displayData.innerHTML += `
          <div class="container-data">
              <div class="row">
                  <div></div>
                  <div class="">
                      <h1 class="rate">Rate: ${value}</h1>
                      <p>Crypto name: ${name}</p>
                      <p>Crypto unit: ${unit}</p>
                  </div>
              </div>
          </div>
        `;
      });
    };

    renderRates(rates);

    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredRates = Object.keys(rates).reduce((result, key) => {
        if (rates[key].name.toLowerCase().includes(searchTerm)) {
          result[key] = rates[key];
        }
        return result;
      }, {});

      renderRates(filteredRates);
    });
  } catch (err) {
    console.log(err);
  }
};

fetchData();
