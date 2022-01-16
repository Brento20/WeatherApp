var currentDay = document.getElementById("currentDay");
var currentDayMJS = moment().format("dddd, MMMM Do YYYY");
// var utcTime = moment.unix(1318781876).utc();
var currentLocation = document.getElementById("getLocation");
var currentWeatherHeader = document.getElementById("currentWeatherHeader");
var currentTempHeader = document.getElementById("currentTemp");
var searchBox = document.getElementById("searchBox");



//Open Weather API
//fetch format: lat={lat}&lon={lon}&exclude={part}&appid={API key}
var key = "&appid=1c58df78b7cb6f05f16ac0c4a7c36504"
var openWeatherAPIlink = "https://api.openweathermap.org/data/2.5/onecall?" 


setInterval(pushTime, 1000);
function pushTime() {
    var tempTimeMJS= moment().format("dddd, Do MMMM YYYY, h:mm");
    currentDay.innerHTML = tempTimeMJS; 
}

/////////////////

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        currentLocation.innerHTML = "Geolocation is not available";
    }
}

function showPosition(position) {

fetch(openWeatherAPIlink + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + key)
    .then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data);
            var kelvin = 273.15;
            var currentTemp = (data.current.temp - kelvin).toFixed(0);
            console.log(currentTemp);
            currentLocation.innerHTML = "Location: " + data.timezone + "<br>" + "Weather: " + data.current.weather[0].description;
            currentTempHeader.innerHTML = currentTemp + "°C";
    });
}


function clickSearch(){
    var city = searchBox.val();
    localStorage.setItem("city :", city); 
    console.log(city);

}

//////////////////

// GET WEATHER FROM API PROVIDER
// function getWeather(latitude, longitude){
//     let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
//     fetch(api)
//         .then(function(response){
//             let data = response.json();
//             return data;
//         })
//         .then(function(data){
//             weather.temperature.value = Math.floor(data.main.temp - 32);
//             weather.description = data.weather[0].description;
//             weather.iconId = data.weather[0].icon;
//             weather.city = data.name;
//         })
//         .then(function(){
//             displayWeather();
//         });

//         console.log(weather)
// }

// // DISPLAY WEATHER TO UI
// function displayWeather(){
//     iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
//     tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//     descElement.innerHTML = weather.description;
//     locationElement.innerHTML = `${weather.city}, ${weather.country}`;
// }

