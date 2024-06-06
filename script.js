document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        displayError('Please enter a city name');
    }
});

async function getWeather(city) {
    const apiKey = '9a7e24985dddf0958c08c33cbb31d73d';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.name;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.querySelector('.weather-info').style.display = 'block';
    document.getElementById('error-message').textContent = '';
}

function displayError(message) {
    document.querySelector('.weather-info').style.display = 'none';
    document.getElementById('error-message').textContent = message;
}
