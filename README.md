# Weather Journal App

A Node.js journaling app that combines data from the OpenWeatherMap API with client-side user input and displays the combined data on the frontend.

> :warning: This project currently supports only U.S. ZIP codes. An API key for OpenWeatherMap is required.


## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints & Data Flow](#endpoints--data-flow)
- [Folder Structure](#folder-structure)
- [Release History](#release-history)
- [Authors](#authors)
- [Contributing](#contributing)
- [License](#license)


## Overview
The Weather Journal App lets users enter their ZIP code and a personal feeling, fetches weather data for that ZIP code from the OpenWeatherMap API, and displays the combined result on the frontend. This project was completed as part of the Udacity Frontend Developer Nanodegree program.


## Features
- Captures user comments (feelings) and associates them with a US ZIP code.
- Resolves the ZIP code into weather data via the OpenWeatherMap API.
- Displays the combined data on the app frontend.
- Simple, client-side UI with server-side data aggregation.


## Tech Stack
- **Node.js**
- **Express.js**
- **body-parser**
- **cors**
- **node-fetch**
- (Optional) Browserify for bundling client-side JavaScript that uses Node's require


## Requirements
- **Node.js** (LTS recommended)
- **OpenWeatherMap API key**
- Internet access to fetch weather data


## Installation

1. Clone the repository
   - `git clone https://github.com/benosho/weather-journal-app.git`
2. Navigate to the project folder
   - `cd weather-journal-app`
3. Install dependencies
   - `npm install`
4. Obtain an OpenWeatherMap API key
   - Sign up at https://openweathermap.org/ and generate an API key
5. Configure the API key
   - Create a local environment variable for your API key. For example:
     - macOS/Linux: `export OPENWEATHERMAP_API_KEY=your_api_key`
     - Windows (PowerShell): `$env:OPENWEATHERMAP_API_KEY="your_api_key"`
   - If the project uses a .env file, place your key there as well and ensure the app loads it (adjust as needed for your setup).
6. (Optional) Build/bundle client-side code
   - If your project uses Browserify or another bundler, follow the project’s bundling steps. The repository documentation may reference Browserify, but you can use any bundler you prefer.


## Usage

- Start the server:
  - `node server.js`
  - or, if a start script exists in package.json, you can use: `npm start`
- Open a browser and navigate to:
  - http://localhost:3000

Notes:
- The app stores and displays the combined data on the frontend.
- Currently, only US ZIP codes are supported.
- Ensure your OPENWEATHERMAP_API_KEY is set in your environment before running.


## Endpoints & Data Flow

- Client-side UI collects: date, ZIP code, and user feelings.
- POST /add — Client submits data to the server.
  - Example payload:
    ```json
    {
      "date": "YYYY-MM-DD",
      "zip": "12345",
      "feeling": "Great weather!"
    }
    ```
- GET /all — Client retrieves the aggregated data from the server to update the UI.
  - Example response shape (depends on server storage):
    ```json
    {
      "date": "YYYY-MM-DD",
      "zip": "12345",
      "temp": 72,
      "feeling": "Great weather!"
    }
    ```

If you need to adjust endpoints, this project typically uses:
- POST /add
- GET /all


## Folder Structure

- `website/` — Client-side assets (HTML, CSS, JavaScript)
  - `website/index.html`
  - `website/css/style.css`
  - `website/js/app.js` (or bundled entry)
- `server.js` — Express server and routes
- `package.json` — Project metadata and scripts
- `package-lock.json` — Locked dependencies
- `README.md` — This file
- `node_modules/` — Project dependencies

---

## Release History

- 1.0.0 - First release (Jan 29, 2021)
  - Initial implementation of a Node.js journaling app combining OpenWeatherMap data with user input


## Authors

- Gbenga "Ben" Oso


## Contributing

Contributions are welcome! Please follow these steps:
- Fork the repository
- Create a feature branch: `git checkout -b feat/new-feature`
- Implement your changes
- Run tests and ensure the app builds
- Open a pull request with a clear description of changes


## License

- This project is open source and licensed under the MIT license.
