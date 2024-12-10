// server.js
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static('public'));

// Real-time weather and air quality from OpenWeatherMap API
app.get('/api/weather_air_quality', async (req, res) => {
    try {
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: 'Delhi,IN',
                appid: process.env.OPENWEATHER_API_KEY,
                units: 'metric'
            }
        });
        const airQualityResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution`, {
            params: {
                lat: weatherResponse.data.coord.lat,
                lon: weatherResponse.data.coord.lon,
                appid: process.env.OPENWEATHER_API_KEY
            }
        });

        res.json({
            weather: weatherResponse.data,
            airQuality: airQualityResponse.data
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Mock data endpoints
app.get('/api/energy_usage', (req, res) => {
    res.json({
        usage: (Math.random() * 50 + 100).toFixed(2),  // Simulated usage in kWh
        timestamp: new Date(),
        mock: true  // Indicating this is mock data
    });
});

app.get('/api/transportation', (req, res) => {
    res.json({
        buses: Math.floor(Math.random() * 50),
        metro: Math.floor(Math.random() * 30),
        timestamp: new Date(),
        mock: true
    });
});

app.get('/api/waste_management', (req, res) => {
    res.json({
        wasteCollected: (Math.random() * 1000).toFixed(2),
        recyclingRate: (Math.random() * 100).toFixed(2),
        timestamp: new Date(),
        mock: true
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
