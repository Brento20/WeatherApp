var currentDay = document.getElementById("currentDay");
var currentDayMJS = moment().format("dddd, MMMM Do YYYY");
var utcTime = moment.unix(1318781876).utc();
var currentLocation = document.getElementById("getLocation");
var currentWeatherHeader = document.getElementById("currentWeatherHeader");


//Open Weather API
//fetch format: lat={lat}&lon={lon}&exclude={part}&appid={API key}
var openWeatherAPIkey = "&appid=1c58df78b7cb6f05f16ac0c4a7c36504"
var openWeatherAPIlink = "https://api.openweathermap.org/data/2.5/onecall?" 






setInterval(pushTime, 1000);
function pushTime() {
    var tempTimeMJS= moment().format("dddd, Do MMMM YYYY, h:mm");
    currentDay.innerHTML = tempTimeMJS; 
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        currentLocation.innerHTML = "Geolocation is not available";
    }
}
function showPosition(position) {
    currentLocation.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;

}




fetch(openWeatherAPIlink + "lat=" + 31.4 + "&lon=" + 96.8 + openWeatherAPIkey)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
        console.log(data.current.uvi)
    
    
        

    });
