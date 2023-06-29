const displayData = document.getElementById('display-data');
const searchInput = document.getElementById('input_search');

const fetchData = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = await response.json();
    const rates = data.rates;
    const totalRates = Object.keys(rates).length;

    const renderRates = async (ratesData) => {
      displayData.innerHTML = ''; // Clear the previous data

      for (const key of Object.keys(ratesData)) {
        const { name, unit, value } = ratesData[key];

        displayData.innerHTML += `
          <div class="data">
            <table>
              <tr>
                <td>
                  <div class="box">
                    <p>no image</p>
                  </div>
                </td>
                <td>
                  <div class="details">
                    <h1 class="rate">Rate: ${value}</h1>
                    <p>Crypto name: ${name}</p>
                    <p>Crypto unit: ${unit}</p>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        `;

        await new Promise((resolve) => setTimeout(resolve, 300)); // Delay rendering each rate by 1 second
      }

      if (Object.keys(ratesData).length === 0) {
        displayData.innerHTML += '<p class="no_more_records">No records found.</p>';
      } else if (Object.keys(ratesData).length === totalRates) {
        setTimeout(() => {
          displayData.innerHTML += '<p class="no_more_records">No more records to be shown.</p>';
        }, 2000); // Delay the display of the "No more records to be shown" message for 2 seconds
      }
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
