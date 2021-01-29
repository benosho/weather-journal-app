/**
 *  Dependencies
 */
const fetch = require('node-fetch');

/**
 * Global Variables
 */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '900b5a2818bc5e0b7e8163ad54f515c6'; // Personal API Key for OpenWeatherMap API

/**
 * Helper functions
 */

// Get current date
const getDate = () => {
    const d = new Date();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    return currentDate;
}

// GET request to external weather API
const getWeather = async (url = '', zip = '', key = '') => {
    const apiResponse = await fetch(url + zip + '&units=metric' + '&appid=' + key);
    try {
        const weatherData = await apiResponse.json();
        return weatherData;
    }
    catch (err) {
        console.log('Error:', err.message);
    }
}

// POST request to local server
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try {
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log('ERROR:', err.message);
    }
}

// GET request to local server
const getData = async (url = '') => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        return data;
    }
    catch (err) {
        console.log('Error:', err.message);
    }
}

/**
 * Main functions
 */

// Capture and display journal entry on click of a button
const generateJournal = () => {
    const button = document.querySelector('#generate');
    button.addEventListener('click', displayOnClick = () => {
        const zipCode = document.querySelector('#zip').value.trim();
        const userInput = document.querySelector('#feelings').value;
        if (zipCode && userInput) {
            getWeather(baseURL, zipCode, apiKey)
                .then((data) => {
                    postData('/add', { temp: data.main.temp, date: getDate(), feelings: userInput })
                        .then(updateUI());
                });
        }
        else {
            alert('Please enter your zip code and your feelings.')
        }
    });
}

const updateUI = async () => {
    const journalEntry = await getData('/data');
    try {
        document.querySelector('#date').innerHTML = `<span class="entry-item">Date:</span>${journalEntry.date}`;
        document.querySelector('#temp').innerHTML = `<span class="entry-item">Temperature:</span>${journalEntry.temp}<sup>o</sup>C`;
        document.querySelector('#content').innerHTML = `<span class="entry-item">Feelings:</span>${journalEntry.feelings}`;
    }
    catch (err) {
        console.log('Error:', err.message);
    }
}

/**
 * Execute functions
 */
generateJournal();