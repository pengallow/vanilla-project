function formatDate(timestamp) {
    // this will calculate the date based on the dt from the api
    let date = new Date(timestamp);

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    return `${day} ${formatHours(timestamp)}`;
}
// the time is based on the last update in the API, not from when the user accesses

function formatHours(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`;
}

function displayTemperature(response) {
    //console.log(response.data);
    //console.log(response.data.main.temp);

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let weatherCondition = document.querySelector("#current-condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let weatherIconElement = document.querySelector("#weather-icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIconElement.setAttribute("alt", document.querySelector("#current-condition"));
}
// setAttribute changes the attritbute in the HTML

function displayForecast(response) {
    //console.log(response.data);
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
                            <h3>${formatHours(forecast.dt * 1000)}</h3>
                            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
                            <div class="weather-forecast-temperature">
                                <strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(forecast.main.temp_min)}º
                            </div>
                        </div>`
}

//forecast = response.data.list[1];
//forecastElement.innerHTML += `<div class="col-2">
        //<h3>${formatHours(forecast.dt * 1000)}</h3>
        //<img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" />
        //<div class="weather-forecast-temperature">
            //<strong>${Math.round(forecast.main.temp_max)}º</strong> ${Math.round(forecast.main.temp_min)}º
        //</div>
    //</div>`                       
}

function search(city) {
    let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    axios.get(apiUrl).then(displayTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    //console.log(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// variables that aren't being created inside a function are called "global variables"

search("Virginia Beach");