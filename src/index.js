function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let dias = ["Thu", "Fri", "Sat", "Sun"];
  dias.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="col-2">
   <div class="weather-forecast-date">${day}</div>  
   <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="" width="42">
<div class="weather-forecast-temps"> <span class="temp-max">18°</span> <span class="temp-min">12°</span> 
</div> 
</div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  fTemperature = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(fTemperature);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  let apiKey = "f475b00cdeff64e56e08b055d6c76e52";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemperature = ((fTemperature - 32) * 5) / 9;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fTemperature);
}
let fTemperature = null;

displayForecast();

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let fahrenheitLink = document.querySelector("#f-temp");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
