import { utilityFunctions } from "./utility";
import { weatherFunctions, weatherStorage } from "./weatherAPI";
import iconOne from "./icons/01d@2x.png";
import iconTwo from "./icons/02d@2x.png";
import iconThree from "./icons/03d@2x.png";
import iconFour from "./icons/04d@2x.png";
import iconNine from "./icons/09d@2x.png";
import iconTen from "./icons/10d@2x.png";
import iconEleven from "./icons/11d@2x.png";
import iconThirteen from "./icons/13d@2x.png";
import iconFifty from "./icons/50d@2x.png";
import imgOne from "./backgroundImg/01d.jpg";
import imgTwo from "./backgroundImg/02d.jpg";
import imgThree from "./backgroundImg/03d.jpg";
import imgFour from "./backgroundImg/04d.jpg";
import imgNine from "./backgroundImg/09d.jpg";
import imgTen from "./backgroundImg/10d.jpg";
import imgEleven from "./backgroundImg/11d.jpg";
import imgThirteen from "./backgroundImg/13d.jpg";
import imgFifty from "./backgroundImg/50d.jpg";

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
    uiStorage.sunrise.innerText = `Sunrise: ${obj.sunrise}`;
    uiStorage.currImg.src = `${this.getWeatherIconURL(
      obj.weatherMain,
      obj.weatherDesc,
      "icon"
    )}`;
    this.updateBackgroundImg(obj.weatherMain, obj.weatherDesc);
  },
  updateForecast: function (obj) {
    while (uiStorage.forecastContainer.lastChild) {
      uiStorage.forecastContainer.removeChild(
        uiStorage.forecastContainer.lastChild
      );
    }
    for (let i = 0; i < obj.length; i++) {
      this.apendForecastItem(i);
      const date = document.querySelector(`.forecastDate-${i}`);
      const desc = document.querySelector(`.forecastDesc-${i}`);
      const temp = document.querySelector(`.forecastTemp-${i}`);
      date.innerText = obj[i].time;
      desc.innerText = obj[i].weatherDesc;
      temp.innerText = `${obj[i].temp}`;
    }
  },
  updateBackgroundImg: function (main, desc) {
    const body = document.querySelector(".body");
    body.style.backgroundImage = this.getWeatherIconURL(main, desc, "current");
  },
  apendForecastItem: function (ref) {
    const forecastItem = document.createElement("div");
    forecastItem.classList.add("forecastItem");
    forecastItem.classList.add(`forecastItem-${ref}`);
    forecastItem.innerHTML = `
                <div class="forecastText forecastText-${ref}">
                    <p class="forecastDate-${ref}"></p>
                    <p class="forecastDesc-${ref}"></p>
                    <p class="forecastTemp-${ref}"></p>
                </div>
                <div class="forecastImg">
                    <img class="weatherIcon weatherIcon-${ref}" src="${this.getWeatherIconURL(
      weatherStorage.activeForecastArr[ref].main,
      weatherStorage.activeForecastArr[ref].weatherDesc,
      "icon"
    )}" alt="weather">
                </div>
        `;
    uiStorage.forecastContainer.appendChild(forecastItem);
  },
  getWeatherIconURL: function (main, desc, type) {
    let idIcon = "";
    let idBack = "";
    if (main === "Thunderstorm") {
      idIcon = iconEleven;
      idBack = imgEleven;
    }
    if (main === "Drizzle") {
      idIcon = iconNine;
      idBack = imgNine;
    }
    if (main === "Rain") {
      idIcon = iconTen;
      idBack = imgTen;
    }
    if (main === "Snow") {
      idIcon = iconThirteen;
      idBack = imgThirteen;
    }
    if (main === "Clear") {
      idIcon = iconOne;
      idBack = imgOne;
    }
    if (desc === "few clouds") {
      idIcon = iconTwo;
      idBack = imgTwo;
    }
    if (desc === "scattered clouds") {
      idIcon = iconThree;
      idBack = imgThree;
    }
    if (desc === "broken clouds" || desc === "overcast clouds") {
      idIcon = iconFour;
      idBack = imgFour;
    }
    if (main === "Mist") {
      idIcon = iconFifty;
      idBack = imgFifty;
    }
    if (type === "icon") {
      return `${idIcon}`;
    }
    if (type === "current") {
      return `url("${idBack}")`;

    }
  },
  displayErrorMsg: function (entry) {
    uiStorage.errorMsg.innerText = `We could not find any results for "${entry}"`;
  },
  initSearchListener: function () {
    uiStorage.searchBox.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        weatherStorage.searchVal = weatherStorage.searchVal.slice(0, -1);
      }
      if (e.code === "Space") {
        weatherStorage.searchVal += e.key;
      }
      if (!utilityFunctions.alphanumOnly(e.key)) {
        return;
      }
      weatherStorage.searchVal += e.key;
    });
  },
  initSubmitBtn: function () {
    uiStorage.searchBtn.addEventListener("click", () => {
      weatherFunctions.getWeather(weatherStorage.searchVal);
      weatherStorage.searchVal = "";
      uiStorage.searchBox.value = "";
    });
  },
  initTempToggle: function () {
    uiStorage.tempToggle.addEventListener("click", () => {
      if (weatherStorage.tempToggle) {
        uiStorage.tempToggle.innerText = "C°";
      } else {
        uiStorage.tempToggle.innerText = "F°";
      }
      weatherFunctions.getWeather(weatherStorage.activeLoc);
      weatherStorage.tempToggle = !weatherStorage.tempToggle;
    });
  },
};

const uiStorage = {
  tempToggle: document.getElementById("toggleTempMetric"),
  location: document.getElementById("location"),
  temp: document.querySelector(".currTemp"),
  feelsLike: document.querySelector(".feelsLike"),
  humidity: document.querySelector(".currHumidity"),
  desc: document.querySelector(".currDesc"),
  currImg: document.querySelector(".currImg"),
  sunrise: document.querySelector(".sunrise"),
  sunset: document.querySelector(".sunset"),
  currentWeatherContainer: document.querySelector(".currentWeatherContainer"),
  forecastContainer: document.querySelector(".forecastContainer"),
  searchBox: document.getElementById("locSearchInput"),
  searchBtn: document.getElementById("locSearchBtn"),
  errorMsg: document.querySelector(".errorMsg"),
};
