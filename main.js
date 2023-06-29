const displayData = document.getElementById('display-data');

const fetchData = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = await response.json();
    const rates = data.rates;

    Object.keys(rates).forEach((key) => {
      const { name, unit, value, type } = rates[key];

      displayData.innerHTML += `
        <div>
          <ul>
            <li>Name: ${name}</li>
            <li>Unit: ${unit}</li>
            <li>Value: ${value}</li>
            <li>Type: ${type}</li>
          </ul>
        </div>
      `;
    });
  } catch (err) {
    console.log(err);
  }
};

fetchData();
