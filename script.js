document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = '51176dfac33004cc652c42b368de16b7'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

function displayWeatherData(data) {
    const weatherResults = document.getElementById('weatherResults');
    weatherResults.innerHTML = ''; 

    data.list.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const date = dateTime.toDateString();
        const time = dateTime.toLocaleTimeString();
        const temperature = item.main.temp;
        const description = item.weather[0].description;

        const weatherDiv = document.createElement('div');
        weatherDiv.classList.add('weather-item');
        weatherDiv.innerHTML = `
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Description:</strong> ${description}</p>
        `;
        weatherResults.appendChild(weatherDiv);
    });
}
