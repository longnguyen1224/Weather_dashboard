import React, { useEffect, useState } from 'react';
import './Weather.css';

const Weather = () => {
    const [weather, setWeather] = useState({
        temperature: 0,
        humidity: 0,
        description: 'N/A'
    });
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!isLoading) {
                return; // Do not fetch weather data if not loading
            }

            try {
                const encodedCity = encodeURIComponent(city);
                const response = await fetch(`http://localhost:8000/api/weather/?city=${encodedCity}`);
                const data = await response.json();
                console.log('Fetched data:', data); // Debugging log
                if (response.ok) {
                    // Capitalize the first letter of the description
                    if (data.description) {
                        data.description = data.description.charAt(0).toUpperCase() + data.description.slice(1);
                    }
                    setWeather(data);
                    setError('');
                } else {
                    setError('City not found. Please enter a valid city.');
                    // Reset to default values on error
                    setWeather({
                        temperature: 0,
                        humidity: 0,
                        description: 'N/A'
                    });
                }
            } catch (err) {
                console.error('Error fetching data:', err); // Debugging log
                setError('An error occurred while fetching data');
                // Reset to default values on error
                setWeather({
                    temperature: 0,
                    humidity: 0,
                    description: 'N/A'
                });
            } finally {
                setIsLoading(false); // Re-enable the input and button after fetching data
            }
        };

        fetchWeather();
    }, [isLoading, city]);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = () => {
        if (city !== '') {
            setIsLoading(true); // Trigger the useEffect to fetch data
        } else {
            setError('Please enter a city.');
        }
    };

    return (
        <div className="container">
            <h1>Weather Dashboard</h1>
            <div className="weather-info">
                <p>Temperature: <span id="temp-value">{weather.temperature}°C</span></p>
                <p>Humidity: <span id="humidity-value">{weather.humidity}%</span></p>
                <p>Description: <span id="description-value">{weather.description}</span></p>
            </div>
            <input
                type="text"
                id="city-input"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city"
                disabled={isLoading}
            />
            <button onClick={handleSubmit} disabled={isLoading}>
                Get Weather
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="clouds">
                <div className="cloud" style={{width: '200px', height: '200px', top: '20%', left: '10%'}}></div>
                <div className="cloud" style={{width: '300px', height: '300px', top: '40%', left: '70%'}}></div>
            </div>
        </div>
    );
};

export default Weather;
