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
        uiStorage.feelsLike.innerText = `feels like ${obj.feelsLike}`;
        uiStorage.humidity.innerText = `Humidity: ${obj.humidity}%`;
        uiStorage.desc.innerText = obj.weatherDesc;
        uiStorage.sunset.innerText = `Sunset: ${obj.sunset}`;
        uiStorage.sunrise.innerText = `Sunrise: ${obj.sunrise}`
        // uiStorage.currImg = function to set currImg depending on desc
    },
    updateForecast: function (obj, startInd, finInd) {
        for (let i = startInd; i < finInd; i++) {
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
            // weatherFunctions.getForecast(weatherStorage.activeWeatherObj.longitude, weatherStorage.activeWeatherObj.latitude)
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
    //forecastObjs
    //forecastBtns
    searchBox: document.getElementById('locSearchInput'),
    searchBtn: document.getElementById('locSearchBtn')
}