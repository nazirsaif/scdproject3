// Simulating Weather Search
document.getElementById("city-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const cityInput = document.getElementById("city-input").value.trim();
    const weatherDisplay = document.getElementById("weather-display");
  
    if (cityInput) {
      // Simulating fetching weather data
      weatherDisplay.innerHTML = `
        <h3>Weather in ${cityInput}</h3>
        <p>Temperature: 25°C</p>
        <p>Humidity: 60%</p>
        <p>Condition: Sunny</p>
      `;
    } else {
      weatherDisplay.innerHTML = `<p>Please enter a valid city name.</p>`;
    }
  });
  
  // Buttons Placeholder
  document.getElementById("forecast-btn").addEventListener("click", () => {
    alert("Forecast feature coming soon!");
  });
  
  document.getElementById("alerts-btn").addEventListener("click", () => {
    alert("Alerts feature coming soon!");
  });
  
  document.getElementById("settings-btn").addEventListener("click", () => {
    alert("Settings feature coming soon!");
  });
  