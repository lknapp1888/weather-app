
import {utilityFunctions} from './utility';
import { uiFunctions } from './UI';

export const weatherFunctions = {
    getWeather: async function (location) {
        try {
        const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=5df130c0b99802bf272a5d9caf76a151`, {
            mode: 'cors'
          })
          if (weather.ok) {
            weather.json().then((e) => this.getWeatherObj(e))
          }
          else {uiFunctions.displayErrorMsg(location)}
        }
        catch {
            console.log('fetch function not working')
        }
    },
    getWeatherObj: function (obj) {  
        const weatherObj = {
            name: obj.name,
            country: obj.sys.country,
            temp: utilityFunctions.kelvinToActiveTemp(obj.main.temp),
            humidity: obj.main.humidity,
            feelsLike: utilityFunctions.kelvinToActiveTemp(obj.main.feels_like),
            weatherID: obj.weather[0].id,
            weatherMain: obj.weather[0].main,
            weatherDesc: obj.weather[0].description,
            sunrise: utilityFunctions.unixConvertToTime(obj.sys.sunrise),
            sunset: utilityFunctions.unixConvertToTime(obj.sys.sunset),
            latitude: obj.coord.lat,
            longitude: obj.coord.lon,
        }
        weatherStorage.activeLoc = obj.name;
        this.setWeatherObj(weatherObj)
        uiFunctions.updateCurr(weatherObj)
        this.getForecast(weatherObj.longitude, weatherObj.latitude)
        return weatherObj;
    },
    setWeatherObj: function (obj) {
        weatherStorage.activeWeatherObj = obj;
    },
    getForecast: async function (lon, lat) {
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5df130c0b99802bf272a5d9caf76a151`, {
            mode: 'cors'
          })
          forecast.json().then((e) => this.getForecastObj(e))
    },
    getForecastObj: function (obj) {
        weatherStorage.activeForecastArr = [];
        for (let i = 0; i < obj.list.length; i++ ) {
            const forecast = obj.list[i];
            const returnObj = {
                time: utilityFunctions.unixConvert(forecast.dt),
                weatherDesc: forecast.weather[0].description,
                main: forecast.weather[0].main,
                temp: utilityFunctions.kelvinToActiveTemp(forecast.main.temp),
                loc: obj.city.name,
            }
            weatherStorage.activeForecastArr.push(returnObj)
        }
        uiFunctions.updateForecast(weatherStorage.activeForecastArr);
    },
}

export const weatherStorage = {
    activeForecastArr: [],
    activeLoc: '',
    searchVal: '',
    tempToggle: true,
}