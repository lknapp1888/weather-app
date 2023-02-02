export const weatherFunctions = {
    getWeather: async function (location) {
        const weather = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=5df130c0b99802bf272a5d9caf76a151`, {
            mode: 'cors'
          });
          
            weather.json().then((e) => this.getWeatherObject(e))     
    },
    getWeatherObject: function (obj) {
        const weatherObj = {
            name: obj.name,
            country: obj.sys.country,
            temp: obj.main.temp,
            pressure: obj.main.pressure,
            humidity: obj.main.humidity,
            feelsLike: obj.main.feels_like,
        }
         this.setWeatherObj(weatherObj)
    },
    setWeatherObj: function (obj) {
        weatherStorage.activeWeatherObj = obj;
        console.log(weatherStorage.activeWeatherObj)
    },
}

export const weatherStorage = {
    activeWeatherObj: {},
}