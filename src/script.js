function displayTemperature(response) {
    //console.log(response.data);
    //console.log(response.data.main.temp);

    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let weatherCondition = document.querySelector("#current-condition");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    weatherCondition.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "3b69d9e884899e81040ee4e357f33f8b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New+York&units=metric&appid=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);