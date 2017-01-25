const shared = require('./weather.shared.js');
const Promise = require('bluebird');

/**
 * Options 
 * {
 *   latitude,
 *   longitude,
 *   units (celsius/fahrenheit),
 *   date ('now', '2017-01-25')
 *   time {optional} ( '12:00' )
 * }
 * 
 * returns =>
 * {
 *    temperature: 18,
 *    humidity: 0.96, {optional}
 *    pressure: 1000, {optional}
 *    weather: 'cloud' || 'rain' || 'snow'  
 * }
 */
module.exports = function get(options){

    if(!options || !options.latitude || !options.longitude) return Promise.reject(new Error('Weather : Latitude and longitude are required.'));

    return getWeatherProvider(0, options);    
};

function getWeatherProvider(index, options){
    if(!shared.providers[index]) return Promise.reject(new Error('No weather provider available')); 
    
    // call the provider
    return gladys.modules[shared.providers[index]].weather.get(options)
        .catch(() => {

            // if the provider is not available, call the next one
            return getWeatherProvider(index + 1, options);
        });
}