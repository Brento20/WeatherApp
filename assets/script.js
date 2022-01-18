//Table Of Contents
//1. STORAGE - Storage for getElements and API Key info.
//2. ONLOAD - onLoad function to set my weather boxes to hidden before I populate them with the weather info.
//3. DATE FILLING - Filling the date information for each of the cards, moment.js really didn't like running in a for loop so I had to do them individually.
//4. LOCAL TEMP - Display local details in the header was just a fun little add on I wanted to include so the user can compare local temps with destination temps.
//5. NESTED FETCH - I nested the fetch request so that I could pick the best data I could for th HTML. This got a little messy but hopefully you can follow.


/////////////////////////////////////////////1. STORAGE 
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
var lastSearchLS = (localStorage.getItem('city :'));
/////////////////


/////////////////////////////////////////////2. ONLOAD
function onload(){
document.getElementById("lastSearch").innerHTML= "<h5>" + "Last Search: " + '"' + lastSearchLS + '"' + "</h5>";
document.getElementById("weatherPanel").setAttribute("class", "hidden");
document.getElementById("weatherPanel1").setAttribute("class", "hidden");
document.getElementById("weatherPanel2").setAttribute("class", "hidden");
document.getElementById("weatherPanel3").setAttribute("class", "hidden");
document.getElementById("weatherPanel4").setAttribute("class", "hidden");
document.getElementById("weatherPanel5").setAttribute("class", "hidden");
};
onload();
/////////////////


/////////////////////////////////////////////2. DATE FILLING
function fillDates(){
    document.getElementById("displayDay1").innerHTML= "<h5>" + moment().add(1, 'days').format("dddd")+ "</h5>";
    document.getElementById("displayDay2").innerHTML= "<h5>" + moment().add(2, 'days').format("dddd")+ "</h5>";
    document.getElementById("displayDay3").innerHTML= "<h5>" + moment().add(3, 'days').format("dddd")+ "</h5>";
    document.getElementById("displayDay4").innerHTML= "<h5>" + moment().add(4, 'days').format("dddd")+ "</h5>";
    document.getElementById("displayDay5").innerHTML= "<h5>" + moment().add(5, 'days').format("dddd")+ "</h5>";

    document.getElementById("displayDate1").innerHTML= moment().add(1, 'days').format("MMM, DD");
    document.getElementById("displayDate2").innerHTML= moment().add(2, 'days').format("MMM, DD");
    document.getElementById("displayDate3").innerHTML= moment().add(3, 'days').format("MMM, DD");
    document.getElementById("displayDate4").innerHTML= moment().add(4, 'days').format("MMM, DD");
    document.getElementById("displayDate5").innerHTML= moment().add(5, 'days').format("MMM, DD");
}
/////////////////


/////////////////////////////////////////////4. LOCAL TEMP
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
/////////////////


/////////////////////////////////////////////5. NESTED FETCH
function clickSearch(){
    var city = searchBox.value;
    localStorage.setItem("city :", city); 
    fillDates();
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + key)
        .then(function(response) {
            
            if (!response.ok){
                alert("Error: The location entered is not valid, please check your spelling and try again.")
            }
            return response.json();
        })
            .then(function(data) {
                console.log(data);
                var tempTemp = (data.list[0].main.temp - kelvin).toFixed(0);
                var lon = data.city.coord.lon;
                var lat = data.city.coord.lat;
                //Current Day
                ElDisplayLocation.innerHTML = "<h5> City: " + data.city.name + "</h5>";
                ElDisplayConditions.innerHTML = "Conditions: " + data.list[0].weather[0].description;
                ElDisplayHumidity.innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
                ElDisplayTemp.innerHTML = "Temperature: " + tempTemp + "°C";
                //5 Day Forecast
                for(i = 1 ; i <= 5 ; i++) {
                    document.getElementById("displayLocation"+[i]).innerHTML= "<h5>" + data.city.name + "</h5>";
                }

                fetch(openWeatherAPIlink + "lat=" + lat + "&lon=" + lon + key)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        document.getElementById("weatherPanel").setAttribute("class", "visible today card grow");
                        document.getElementById("weatherPanel1").setAttribute("class", "visible card future grow");
                        document.getElementById("weatherPanel2").setAttribute("class", "visible card future grow");
                        document.getElementById("weatherPanel3").setAttribute("class", "visible card future grow");
                        document.getElementById("weatherPanel4").setAttribute("class", "visible card future grow");
                        document.getElementById("weatherPanel5").setAttribute("class", "visible card future grow");
                        
                        if(data.current.uvi > 10){
                            ElDisplayUVI.setAttribute("class", "UVIHigh")
                        }else if(data.current.uvi > 5){
                            ElDisplayUVI.setAttribute("class", "UVIMid")
                        }else {
                            ElDisplayUVI.setAttribute("class", "UVILow")
                        }

                        //Current Day
                        ElDisplayDate.innerHTML = moment().format("MMM, DD");
                        ElDisplayDay.innerHTML = "<h5>" + "Current Day: " + moment().format("dddd") + "</h5>";
                        ElDisplayUVI.innerHTML = " Current UV Index: " + data.current.uvi;
                        document.getElementById("displayWeatherIcon").src="assets/images/" + data.current.weather[0].icon + ".svg";

                        //5 Day Forecast
                        for(i = 1 ; i <= 5 ; i++) {
                            if(data.daily[i].uvi > 10){ // UVI color warning code
                                document.getElementById("displayUVI"+[i]).setAttribute("class", "UVIHigh")
                            }else if(data.daily[i].uvi > 5){
                                document.getElementById("displayUVI"+[i]).setAttribute("class", "UVIMid")
                            }else {
                                document.getElementById("displayUVI"+[i]).setAttribute("class", "UVILow")
                            }

                            document.getElementById("displayWeatherIcon"+[i]).src="assets/images/" + data.daily[i].weather[0].icon + ".svg";
                            document.getElementById("displayTemp"+[i]).innerHTML="Temperature: " + (data.daily[i].temp.day - kelvin).toFixed(0) + "°C";
                            document.getElementById("displayHumidity"+[i]).innerHTML="Humidity: " + data.daily[i].humidity + "%";
                            document.getElementById("displayUVI"+[i]).innerHTML=" UV Index: " + data.daily[i].uvi;
                            document.getElementById("displayConditions"+[i]).innerHTML="Conditions: " + data.daily[i].weather[0].description;
                        }
                });
            });
}

