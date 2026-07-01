// yabdelsa2862-lab_Cool-App/app.js

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware for serving static files
app.use(express.static('public'));

// Route for weather fetching
app.get('/weather', async (req, res) => {
    const city = req.query.city || 'Hamilton';
    const apiKey = 'your-api-key-here'; // Replace with your actual OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        res.send({
            city: data.name,
            temperature: data.main.temp,
            weather: data.weather[0].description,
        });
    } catch (error) {
        res.status(400).send({ error: 'Unable to fetch weather data. Check city name or API key.' });
    }
});

// Main route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start server
app.listen(port, () => {
    console.log(`Weather app is running at http://localhost:${port}`);
});