const weatherThumb = document.querySelector('.weather__thumb');
const weatherTemp = document.querySelector('.weather__temp');
const weatherCond = document.querySelector('.weather__cond');
const weatherLocation = document.querySelector('.weather__location');
const weatherDate = document.querySelector('.weather__date');
const weatherIcon = document.querySelector('.weather__icon');
const weatherWeekList = document.querySelector('.weather__week--list');

const apiKey = 'ac97801f712add3fe97dbc6a96855cd7';

import wIcon from '../images/wether-icons/*.webp';

async function updateWeatherInfo(weatherData) {
  weatherTemp.textContent = `${Math.round(weatherData.main.temp)}°C`;
  weatherCond.textContent = weatherData.weather[0].description;
  weatherLocation.textContent = weatherData.name;
  const date = new Date();
  weatherDate.innerHTML = `${date.toLocaleString('en-us', {
    weekday: 'short',
  })}<br />${date.toLocaleString('en-us', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })}`;
  const iconCode = weatherData.weather[0].icon;
  let urlIcons = wIcon[`${iconCode}`];
  weatherIcon.setAttribute('src', urlIcons);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeatherData, errorCallback);
    navigator.geolocation.getCurrentPosition(
      getWeatherForWeek,
      errorWeekWeatherCallback
    );
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}
function getWeatherData(position) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  fetch(weatherApiUrl)
    .then(response => response.json())
    .then(data => {
      updateWeatherInfo(data);
    })
    .catch(error => console.log(error));
}

function errorCallback() {
  const urlKyiv = `https://api.openweathermap.org/data/2.5/weather?q=Kyiv&units=metric&appid=${apiKey}`;
  fetch(urlKyiv)
    .then(response => response.json())
    .then(data => {
      updateWeatherInfo(data);
    })
    .catch(error => console.log(error));
}

function errorWeekWeatherCallback() {
  const urlKyiv = `https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&appid=${apiKey}&units=metric`;
  fetch(urlKyiv)
    .then(response => response.json())
    .then(data => {
      const weatherData = data.list;

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (let i = 0; i < weatherData.length; i += 8) {
        const weatherDay = weatherData[i];

        const date = new Date(weatherDay.dt * 1000);
        const dayOfMonth = date.getDate();
        const dayOfWeek = daysOfWeek[date.getDay()];

        const iconCode = weatherDay.weather[0].icon;
        const iconUrl = wIcon[`${iconCode}`];

        const tempDay = Math.round(weatherDay.main.temp);
        const tempNight = Math.round(weatherData[i + 4].main.temp);

        const weatherThumb = document.createElement('li');
        weatherThumb.classList.add('weather__week--thumb');

        const weatherDate = document.createElement('p');
        weatherDate.classList.add('weather__week-date');
        weatherDate.textContent = `${dayOfMonth} ${dayOfWeek}`;

        const weatherIcon = document.createElement('img');
        weatherIcon.classList.add('weather__week-icon');
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', 'Weather icon');

        const weatherTempThumb = document.createElement('div');
        weatherTempThumb.classList.add('weather__week-temp--thumb');

        const weatherTempDay = document.createElement('p');
        weatherTempDay.classList.add('weather__week-temp--day');
        weatherTempDay.textContent = `${tempDay}C`;

        const weatherTempNight = document.createElement('p');
        weatherTempNight.classList.add('weather__week-temp--night');
        weatherTempNight.textContent = `${tempNight}C`;

        weatherTempThumb.appendChild(weatherTempDay);
        weatherTempThumb.appendChild(weatherTempNight);

        weatherThumb.appendChild(weatherDate);
        weatherThumb.appendChild(weatherIcon);
        weatherThumb.appendChild(weatherTempThumb);

        weatherWeekList.appendChild(weatherThumb);
      }
    })
    .catch(error => console.log(error));
}

function getWeatherForWeek(position) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const weatherData = data.list;

      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

      for (let i = 0; i < weatherData.length; i += 8) {
        const weatherDay = weatherData[i];

        const date = new Date(weatherDay.dt * 1000);
        const dayOfMonth = date.getDate();
        const dayOfWeek = daysOfWeek[date.getDay()];

        const iconCode = weatherDay.weather[0].icon;
        const iconUrl = wIcon[`${iconCode}`];

        const tempDay = Math.round(weatherDay.main.temp);
        const tempNight = Math.round(weatherData[i + 4].main.temp);

        const weatherThumb = document.createElement('li');
        weatherThumb.classList.add('weather__week--thumb');

        const weatherDate = document.createElement('p');
        weatherDate.classList.add('weather__week-date');
        weatherDate.textContent = `${dayOfMonth} ${dayOfWeek}`;

        const weatherIcon = document.createElement('img');
        weatherIcon.classList.add('weather__week-icon');
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', 'Weather icon');

        const weatherTempThumb = document.createElement('div');
        weatherTempThumb.classList.add('weather__week-temp--thumb');

        const weatherTempDay = document.createElement('p');
        weatherTempDay.classList.add('weather__week-temp--day');
        weatherTempDay.textContent = `${tempDay}C`;

        const weatherTempNight = document.createElement('p');
        weatherTempNight.classList.add('weather__week-temp--night');
        weatherTempNight.textContent = `${tempNight}C`;

        weatherTempThumb.appendChild(weatherTempDay);
        weatherTempThumb.appendChild(weatherTempNight);

        weatherThumb.appendChild(weatherDate);
        weatherThumb.appendChild(weatherIcon);
        weatherThumb.appendChild(weatherTempThumb);

        weatherWeekList.appendChild(weatherThumb);
      }
    })
    .catch(error => {
      console.log('An error occurred:', error);
    });
}
const weekButton = document.querySelector('.weather__week');
function toggleWeather(e) {
  weatherIcon.classList.toggle('display-none');
  weatherWeekList.classList.toggle('display-none');
}

function renameBtn() {
  if (weekButton.textContent === 'weather for week') {
    weekButton.textContent = 'weather for today';
  } else if (weekButton.textContent === 'weather for today') {
    weekButton.textContent = 'weather for week';
  }
}

weekButton.addEventListener('click', toggleWeather);
weekButton.addEventListener('click', renameBtn);
getLocation();
