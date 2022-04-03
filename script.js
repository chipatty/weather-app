//feature 1
//In your project, display the current date and time using JavaScript: Tuesday 16:00
let now = new Date();

function currentDate(date) {
  let nowDate = new Date();
  let dayIndex = nowDate.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];
  let monthIndex = nowDate.getMonth();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[monthIndex];
  let currentDate = nowDate.getDate();
  let year = nowDate.getFullYear();

  return `${day} ${month} ${currentDate}, ${year}`;
}

let dayDate = document.querySelector("#day-date");
dayDate.innerHTML = currentDate(now);

function newDate() {
  let newDateAfterSearch = document.querySelector("#day-date");
  newDateAfterSearch.innerHTML = currentDate(now);
}

let dateAfterSearch = document.querySelector("#city-form");
dateAfterSearch.addEventListener("click", newDate);

function currentTime(city) {
  let nowTime = new Date();
  let hour = nowTime.getHours();
  let minutes = nowTime.getMinutes();
  if (hour < 12 && minutes < 10) {
    return `${hour}:0${minutes} AM`;
  } else if (hour < 12) {
    return `${hour}:${minutes} AM`;
  } else if (minutes < 10) {
    let adjustedHour = hour - 12;
    return `${adjustedHour}:0${minutes} PM`;
  } else {
    let adjustedHour = hour - 12;
    return `${adjustedHour}:${minutes} PM`;
  }
}

let updateTime = document.querySelector("#time");
updateTime.innerHTML = currentTime(now);

function newTime() {
  let newTimeAfterSearch = document.querySelector("#time");
  newTimeAfterSearch.innerHTML = currentTime(now);
}

let timeAfterSearch = document.querySelector("#city-form");
timeAfterSearch.addEventListener("click", newTime);

//week 5
//when a user searches for a city (example: New York), it should display the name of the city on the result page

function displayCity(city) {
  city.preventDefault();
  let cityName = document.querySelector("#city-name");
  let searchedCity = document.querySelector("#city-input");
  cityName.innerHTML = searchedCity.value;
}

let updateCity = document.querySelector("#city-form");
updateCity.addEventListener("submit", displayCity);

//week 5
//should display the current temp of the city

function displayTemp(response) {
  let cityTemp = document.querySelector("#city-temp");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}°C`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = `Humidity: ${response.data.main.humidity}%`;
  humidityElement.innerHTML = humidity;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `Wind: ${wind} km/h`;

  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = description;
}

function getCity(city) {
  let searchedCity = document.querySelector("#city-input");
  let updatedCity = searchedCity.value;
  let units = "metric";
  let apiKey = "8f26f033c56e27423954ffa70364e1be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${updatedCity}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
let updateTemp = document.querySelector("#city-form");
updateTemp.addEventListener("submit", getCity);

//

//When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city
//and current temperature using the OpenWeather API.

function updateCityandTemp(response) {
  let updateCity = document.querySelector("#city-name");
  let cityName = response.data.name;
  console.log(response);
  updateCity.innerHTML = cityName;

  let cityTemp = document.querySelector("#city-temp");
  let temperature = Math.round(response.data.main.temp);
  cityTemp.innerHTML = `${temperature}°C`;

  let humidityElement = document.querySelector("#humidity");
  let humidity = `Humidity: ${response.data.main.humidity}%`;
  humidityElement.innerHTML = humidity;

  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  windElement.innerHTML = `Wind: ${wind} km/h`;

  let descriptionElement = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  descriptionElement.innerHTML = description;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "8f26f033c56e27423954ffa70364e1be";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(updateCityandTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentPosition);

//need to get precipitation to work, convert to F, show emojis of correct weather description
//work on the future forecast
//change the sun to moon when it night
