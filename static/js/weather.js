// ======================================
// Weather Module
// ======================================

// Replace with your OpenWeatherMap API key
const WEATHER_API_KEY = "aa0b2b8f1bbe92442b826dfc6841125b";


function startVoice(){

const recognition=new webkitSpeechRecognition();

recognition.lang="en-IN";

recognition.start();

recognition.onresult=function(e){

document.getElementById("city").value=e.results[0][0].transcript;

getWeather();

}

}
// Get user's location
function getCurrentLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            position => {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                fetchWeather(lat, lon);

            },

            error => {

                console.log("Location permission denied");

                // Default Location - Hyderabad
                fetchWeatherByCity("Hyderabad");

            }

        );

    } else {

        fetchWeatherByCity("Hyderabad");

    }

}

// Fetch weather using latitude & longitude
async function fetchWeather(lat, lon) {

    try {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`

        );

        const data = await response.json();

        updateWeatherUI(data);

    }

    catch (error) {

        console.error(error);

    }

}

// Fetch weather by city
async function fetchWeatherByCity(city) {

    try {

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`

        );

        const data = await response.json();

        updateWeatherUI(data);

    }

    catch (error) {

        console.error(error);

    }

}

// Update Dashboard
function updateWeatherUI(data) {

    document.getElementById("temperature").innerHTML =
        Math.round(data.main.temp) + "°C";

    document.getElementById("humidity").innerHTML =
        data.main.humidity + "%";

    document.getElementById("tempCard").innerHTML =
        Math.round(data.main.temp) + "°C";

    document.getElementById("humidityCard").innerHTML =
        data.main.humidity + "%";

    document.getElementById("windCard").innerHTML =
        data.wind.speed + " km/h";

    document.getElementById("cityCard").innerHTML =
        data.name;

    console.log("Weather Updated");

}

// Auto Load
window.addEventListener("load", () => {

    getCurrentLocation();

});

// Refresh every 10 minutes
setInterval(getCurrentLocation, 600000);
