import { utilityFunctions } from "./utility";
import { weatherFunctions, weatherStorage } from "./weatherAPI";

export const uiFunctions = {
    loadPage: function () {
        this.initSearchListener();
        this.initSubmitBtn();
        this.initTempToggle();
    },
    updateCurr: function (obj) {
        uiStorage.location.innerText = `${obj.name}, ${obj.country}`;
        uiStorage.temp.innerText = `Temp: ${obj.temp}`;
        uiStorage.feelsLike.innerText = `feels like: ${obj.feelsLike}`;
        uiStorage.humidity.innerText = `Humidity: ${obj.humidity}%`;
        uiStorage.desc.innerText = obj.weatherDesc;
        uiStorage.sunset.innerText = `Sunset: ${obj.sunset}`;
        uiStorage.sunrise.innerText = `Sunrise: ${obj.sunrise}`
        uiStorage.currImg.src = `${this.getWeatherIconURL(obj.weatherMain, obj.weatherDesc, 'icon')}`
        this.updateBackgroundImg(obj.weatherMain, obj.weatherDesc)
    },
    updateForecast: function (obj) {
        while (uiStorage.forecastContainer.lastChild) {
            uiStorage.forecastContainer.removeChild(uiStorage.forecastContainer.lastChild);
        };
        for (let i = 0; i < obj.length; i++) {
            this.apendForecastItem(i)
            const date = document.querySelector(`.forecastDate-${i}`);
            const desc = document.querySelector(`.forecastDesc-${i}`);
            const temp = document.querySelector(`.forecastTemp-${i}`);
            // weather img function
            console.log(obj[i].loc);
            date.innerText = obj[i].time;
            desc.innerText = obj[i].weatherDesc;
            temp.innerText = `${obj[i].temp}`;
        }
    },
    updateBackgroundImg: function (main, desc) {
        const body = document.querySelector('.body');
        body.style.backgroundImage = this.getWeatherIconURL(main, desc, 'current')
        console.log(body.style.backgroundImage)
    },
    apendForecastItem: function (ref) {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecastItem');
        forecastItem.classList.add(`forecastItem-${ref}`)
        forecastItem.innerHTML = `
                <div class="forecastText forecastText-${ref}">
                    <p class="forecastDate-${ref}"></p>
                    <p class="forecastDesc-${ref}"></p>
                    <p class="forecastTemp-${ref}"></p>
                </div>
                <div class="forecastImg">
                    <img class="weatherIcon weatherIcon-${ref}" src="${
                        this.getWeatherIconURL(weatherStorage.activeForecastArr[ref].main, weatherStorage.activeForecastArr[ref].weatherDesc, 'icon')}" alt="weather">
                </div>
        `
        uiStorage.forecastContainer.appendChild(forecastItem);
    },
    getWeatherIconURL: function (main, desc, type) {
        let id = '';
        if (main === 'Thunderstorm') {id = '11d'};
        if (main === 'Drizzle') {id = '09d'};
        if (main === 'Rain') {id = '10d'};
        if (main === 'Snow') {id = '13d'};
        if (main === 'Clear') {id = '01d'};
        if (desc === 'few clouds') {id = '02d'}
        if (desc === 'scattered clouds') {id = '03d'}
        if ((desc === 'broken clouds') || (desc === 'overcast clouds')) {id = '04d'}
        if (type === 'icon') {return `/src/icons/${id}@2x.png`}
        if (type === 'current') {return `url("/src/backgroundImg/${id}.jpg")`}
    },
    initSearchListener: function () {
        uiStorage.searchBox.addEventListener('keydown', (e) => {
            if (!utilityFunctions.alphanumOnly(e.key)) {return};
            weatherStorage.searchVal+= e.key
            console.log(weatherStorage.searchVal)
        })
    },
    initSubmitBtn: function () {
        uiStorage.searchBtn.addEventListener('click', () => {
            weatherFunctions.getWeather(weatherStorage.searchVal);
            weatherStorage.searchVal = '';
            uiStorage.searchBox.value = '';
        })
    },
    initTempToggle: function () {
        uiStorage.tempToggle.addEventListener('click', () => {
            if (weatherStorage.tempToggle) {
                uiStorage.tempToggle.innerText = 'C°';
            }
            else {
                uiStorage.tempToggle.innerText = 'F°';
            }
            weatherFunctions.getWeather(weatherStorage.activeLoc)
            weatherStorage.tempToggle = !weatherStorage.tempToggle
        })
    },
}

const uiStorage = {
    tempToggle: document.getElementById('toggleTempMetric'),
    location: document.getElementById('location'),
    temp: document.querySelector('.currTemp'),
    feelsLike: document.querySelector('.feelsLike'),
    humidity: document.querySelector('.currHumidity'),
    desc: document.querySelector('.currDesc'),
    currImg: document.querySelector('.currImg'),
    sunrise: document.querySelector('.sunrise'),
    sunset: document.querySelector('.sunset'),
    currentWeatherContainer: document.querySelector('.currentWeatherContainer'),
    forecastContainer: document.querySelector('.forecastContainer'),
    searchBox: document.getElementById('locSearchInput'),
    searchBtn: document.getElementById('locSearchBtn')
}