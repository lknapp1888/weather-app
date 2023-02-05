
import {utilityFunctions} from './utility'

export const weatherFunctions = {
    getWeather: async function (location) {
        const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=5df130c0b99802bf272a5d9caf76a151`, {
            mode: 'cors'
          })
            weather.json().then((e) => this.getWeatherObj(e))
    },
    getWeatherObj: function (obj) {
        const weatherObj = {
            name: obj.name,
            country: obj.sys.country,
            temp: utilityFunctions.kelvinToC(obj.main.temp),
            humidity: obj.main.humidity,
            feelsLike: utilityFunctions.kelvinToC(obj.main.feels_like),
            weatherID: obj.weather[0].id,
            weatherMain: obj.weather[0].main,
            weatherDesc: obj.weather[0].description,
            sunrise: utilityFunctions.unixConvertToTime(obj.sys.sunrise),
            sunset: utilityFunctions.unixConvertToTime(obj.sys.sunset),
        }
        this.setWeatherObj(weatherObj)
        return weatherObj;
    },
    setWeatherObj: function (obj) {
        weatherStorage.activeWeatherObj = obj;
        console.log(weatherStorage.activeWeatherObj)
    },
    getForecast: async function (lon, lat) {
        const forecast = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5df130c0b99802bf272a5d9caf76a151`, {
            mode: 'cors'
          })
          forecast.json().then((e) => this.getForecastObj(e))
    },
    getForecastObj: function (obj) {
        console.log(obj)
        for (let i = 0; i < obj.list.length; i++ ) {
            const forecast = obj.list[i];
            const returnObj = {
                time: utilityFunctions.unixConvert(forecast.dt),
                weatherDesc: forecast.weather[0].description,
                temp: utilityFunctions.kelvinToC(forecast.main.temp),
            }
            weatherStorage.activeForecastArr.push(returnObj)
        }
        console.log(weatherStorage.activeForecastArr)
    },
}

export const weatherStorage = {
    activeWeatherObj: {},
    activeForecastArr: [],
}