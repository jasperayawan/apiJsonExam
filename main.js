const displayData = document.getElementById('display-data');
const searchInput = document.getElementById('input_search');

const fetchData = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = await response.json();
    const rates = data.rates;

    const renderRates = (ratesData) => {
      displayData.innerHTML = '';

      const rateKeys = Object.keys(ratesData);

      rateKeys.forEach((key, index) => {
        const { name, unit, value, type } = ratesData[key];

        // Delay the rendering of each item by the index multiplied by the delay time (1000 milliseconds = 1 second)

        setTimeout(() => {
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

          // Check if it's the last item and show a notification

          if (index === rateKeys.length - 1) {
            setTimeout(() => {
              displayData.innerHTML += '<p class="no_more_records">No more records to be shown.</p>';
            }, 1000);
          }
        }, index * 1000); // Delay each item by the index multiplied by the delay time (1000 milliseconds = 1 second)
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

// Call the fetchData function to start fetching and displaying the data

fetchData();
