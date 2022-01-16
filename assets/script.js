//Header fun things (on click)
var currentDay = document.getElementById("currentDay");
var currentDayMJS = moment().format("dddd, MMMM Do YYYY");
var currentLocation = document.getElementById("getLocation");
var currentWeatherHeader = document.getElementById("currentWeatherHeader");
var currentTempHeader = document.getElementById("currentTemp");

// Display Forecast
var ElDisplayDay = document.getElementById("displayDay");
var ElDisplayDate = document.getElementById("displayDate");
var ElDisplayWeatherIcon = document.getElementById("displayWeatherIcon");
var ElDisplayTemp = document.getElementById("displayTemp");
var ElDisplayLocation = document.getElementById("displayLocation");
var ElDisplayHumidity = document.getElementById("displayHumidity");
var ElDisplayConditions = document.getElementById("displayConditions");
var ElDisplayUVI = document.getElementById("displayUVI");


//Open Weather API
var key = "&appid=1c58df78b7cb6f05f16ac0c4a7c36504"
var openWeatherAPIlink = "https://api.openweathermap.org/data/2.5/onecall?" 

//Modifiers 
var kelvin = 273.15;



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
            var currentTemp = (data.current.temp - kelvin).toFixed(0);
            console.log(currentTemp);
            currentLocation.innerHTML = "Location: " + data.timezone + "<br>" + "Weather: " + data.current.weather[0].description;
            currentTempHeader.innerHTML = currentTemp + "°C";
    });
}


function clickSearch(){
    var city = searchBox.value;
    localStorage.setItem("city :", city); 
    
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + key)
        .then(function(response) {
            return response.json();
        })
            .then(function(data) {
                console.log(data);
                var tempTemp = (data.list[0].main.temp - kelvin).toFixed(0);
                var lon = data.city.coord.lon;
                var lat = data.city.coord.lat;

                ElDisplayLocation.innerHTML = "<h5> City: " + data.city.name + "</h5>";
                ElDisplayConditions.innerHTML = "Conditions: " + data.list[0].weather[0].description;
                ElDisplayHumidity.innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
                ElDisplayTemp.innerHTML = "Temperature: " + tempTemp + "°C";

                fetch(openWeatherAPIlink + "lat=" + lat + "&lon=" + lon + key)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log(data);
                        console.log(data.current.weather[0].icon);
                        //ElDisplayWeatherIcon.innerHTML = "<img src='assets/images/'" + data.current.weather[0].icon + ".svg></img>"
                        ElDisplayDate.innerHTML = moment().format("MMM, DD");
                        ElDisplayDay.innerHTML = "<h5>" + moment().format("dddd"); + "</h5>"
                        ElDisplayUVI.innerHTML = "UV Index: " + data.current.uvi;
                        document.getElementById("displayWeatherIcon").src="assets/images/" + data.current.weather[0].icon + ".svg";
                        document.getElementById("weatherPanel").style.visibility="visible";
                });
                

            });

}

