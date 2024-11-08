// app.js

document.addEventListener('DOMContentLoaded', () => {
    initializeMap();
    fetchData();
    setInterval(fetchData, 60000);
});

async function fetchData() {
    try {
        const weatherData = await fetch('/api/weather_air_quality').then(res => res.json());
        displayWeatherData(weatherData.weather);
        displayAirQualityData(weatherData.airQuality);

        const energyData = await fetch('/api/energy_usage').then(res => res.json());
        displayEnergyData(energyData);

        const transportData = await fetch('/api/transportation').then(res => res.json());
        displayTransportData(transportData);

        const wasteData = await fetch('/api/waste_management').then(res => res.json());
        displayWasteData(wasteData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayWeatherData(weather) {
    document.getElementById('weather-info').innerHTML = `
        <strong>Temperature:</strong> ${weather.main.temp}°C<br>
        <strong>Humidity:</strong> ${weather.main.humidity}%<br>
    `;
}

function displayAirQualityData(airQuality) {
    const aqiLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    document.getElementById('air-quality-info').innerHTML = `
        <strong>Air Quality Index:</strong> ${airQuality.list[0].main.aqi} (${aqiLevels[airQuality.list[0].main.aqi - 1]})
    `;
}

function displayEnergyData(data) {
    document.getElementById('energy-info').textContent = `Energy Usage: ${data.usage} kWh`;
}

function displayTransportData(data) {
    document.getElementById('transportation-info').innerHTML = `
        <strong>Buses Active:</strong> ${data.buses}<br>
        <strong>Metro Trains Active:</strong> ${data.metro}
    `;
}

function displayWasteData(data) {
    document.getElementById('waste-info').innerHTML = `
        <strong>Waste Collected:</strong> ${data.wasteCollected} kg<br>
        <strong>Recycling Rate:</strong> ${data.recyclingRate}%
    `;
}

function initializeMap() {
    // Create the map using Leaflet
    const map = L.map('city-map').setView([28.6139, 77.2090], 10);  // Coordinates for Delhi

    // Add OpenStreetMap tile layer (Free and no signup required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker on the map
    L.marker([28.6139, 77.2090]).addTo(map)
        .bindPopup('Delhi, India')
        .openPopup();
}

