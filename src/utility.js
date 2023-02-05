import { fromUnixTime } from 'date-fns';
import { format } from 'date-fns';
import { weatherStorage } from './weatherAPI';

export const utilityFunctions = {
    unixConvert: function (unix) {
        let date = fromUnixTime(unix);
        date = format(date, 'HH:mm dd-MMM-yy')
        return date;
    },
    unixConvertToTime: function (unix) {
        let date = fromUnixTime(unix);
        date = format(date, 'HH:mm')
        return date;
    },
    alphanumOnly: function (val) {
        if (val.length > 1) {return false}
        if (parseInt(val)) {return false}
        return /^[a-zA-Z0-9]+$/.test(val);
    },
    kelvinToC: function (num) {
        return parseInt((num - 273.15))
    },
    kelvinToF: function (num) {
        return parseInt((1.8*(num-273) + 32))
    },
    cToF: function (num) {
        return parseInt(((1.8 * (num)) + 32))
    },
    fToC: function (num) {
        return parseInt(((num - 32) * .5556))
    },
    kelvinToActiveTemp: function (temp) {
        if (weatherStorage.tempToggle) {
            return `${this.kelvinToC(temp)}C°`;
           }
           else {
            return`${this.kelvinToF(temp)}F°`;
           }
    }

}