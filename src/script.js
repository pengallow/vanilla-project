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

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
let city = "Virginia Beach";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);