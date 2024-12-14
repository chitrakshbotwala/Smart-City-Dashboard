document.addEventListener('DOMContentLoaded', function () {
    fetchWeather();
    fetchAirQuality();
    displayEnergyUsage();
    displayTransportationData();
    displayWasteManagementData();
    initializeMap();
    updateClock();
    setInterval(updateClock, 1000);
    document.getElementById('loading').style.display = 'none';
});

function fetchWeather() {
    const apiKey = 'dd27f1666fcda92d68c815697ccd0991'; 
    const city = 'Delhi';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `
                <div><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon" /> ${data.main.temp}°C</div>
                <div>Humidity: ${data.main.humidity}%</div>
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function fetchAirQuality() {
    const apiKey = 'dd27f1666fcda92d68c815697ccd0991';  
    const lat = 28.6139;
    const lon = 77.2090;
    const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(aqiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const airQualityDiv = document.getElementById('air-quality');
            const aqi = data.list[0].main.aqi;
            let aqiStatus = '';

            switch (aqi) {
                case 1:
                    aqiStatus = 'Good';
                    break;
                case 2:
                    aqiStatus = 'Fair';
                    break;
                case 3:
                    aqiStatus = 'Moderate';
                    break;
                case 4:
                    aqiStatus = 'Poor';
                    break;
                case 5:
                    aqiStatus = 'Very Poor';
                    break;
                default:
                    aqiStatus = 'Unknown';
            }

            airQualityDiv.innerHTML = `
                <div>AQI: ${aqi}</div>
                <div>(${aqiStatus})</div>
            `;
        })
        .catch(error => console.error('Error fetching air quality data:', error));
}

function displayEnergyUsage() {
    const energyProgress = document.getElementById('energy-progress');
    const usage = 70; // Mock percentage value
    energyProgress.innerHTML = `<div class="progress-bar-inner" style="width: ${usage}%;"><span>${usage}%</span></div>`;
}

function displayTransportationData() {
    const transportationType = document.getElementById('transportation-type');
    const transportationData = document.getElementById('transportation-data');
    transportationType.addEventListener('change', function () {
        if (this.value === 'bus') {
            transportationData.innerHTML = '<p>Bus 101: On Time</p><p>Bus 203: Delayed</p>';
        } else {
            transportationData.innerHTML = '<p>Metro Line 2: On Time</p><p>Metro Line 5: Delayed</p>';
        }
    });
    // Initialize with bus data
    transportationType.value = 'bus';
    transportationData.innerHTML = '<p>Bus 101: On Time</p><p>Bus 203: Delayed</p>';
}

function displayWasteManagementData() {
    const recyclingProgress = document.getElementById('recycling-progress');
    const wasteProgress = document.getElementById('waste-progress');
    recyclingProgress.innerHTML = '<div class="progress-bar-inner" style="width: 40%;"><span>40%</span></div>';
    wasteProgress.innerHTML = '<div class="progress-bar-inner" style="width: 60%;"><span>60%</span></div>';
}

function initializeMap() {
    const map = L.map('map').setView([28.6139, 77.2090], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup('Delhi')
        .openPopup();
}

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const date = now.toDateString();
    clock.textContent = `${date} , ${hours}:${minutes}`;
}
