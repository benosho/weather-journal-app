(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
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
},{"node-fetch":1}]},{},[2]);
