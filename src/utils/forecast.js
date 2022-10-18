const request = require('request')

const forecast = (lat, long, callback)=>{
    const forecast_api= 'http://api.weatherstack.com/current?access_key=be0e6270a65bb5d844b960d39aa1f182&query='+lat+','+long+'&units=m'
    request({url: forecast_api, json: true},(error, response) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }else if(response.body.error){
            callback('Unbale to find locationn',undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] +'. It is currently '+ response.body.current.temperature+
            ' degrees out. and it feels like ' + response.body.current.feelslike+' degrees. The Humidity is: '+ response.body.current.humidity + '%')
        }
    })
}
module.exports = forecast