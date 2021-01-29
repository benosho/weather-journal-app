// Endpoint for all routes
let projectData = {};

/**
 * Middleware and Dependencies
 */

// Include express, body-parser and cors
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initiate Express app instance
const app = express();

// Connect body-parser and cors to the app
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Point app to the website folder
app.use(express.static('website'));

// Start the server on port 4000
const port = 3000;
const server = app.listen(port, () => console.log(`weather-journal-app running on localhost:${port}`));

/**
 * Setup GET and POST request routes
 */

// GET route
app.get('/data', (request, response) => response.send(projectData));

// POST route
app.post('/add', (request, response) => projectData = request.body);
