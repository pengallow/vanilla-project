function formatDate(timestamp) {
    // this will calculate the date based on the dt from the api
    
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}
// the time is based on the last update in the API, not from when the user accesses

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

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    weatherIconElement.setAttribute("alt", document.querySelector("#current-condition"));
}
// set attribute changes the attritbute in the HTML

function search(city) {
    let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
    //console.log(cityInputElement.value);
}

//search("Virginia Beach");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);