const request = require('request')

const forecast = (latitude, longitiude , callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7ac66e0c4decb1aac518f0f626860102&query='+ longitiude +','+ latitude + ''

    request({ url, json: true }, (error, {body} = {}) => {
            //console.log(response.body.current)
              if(error) {
                  callback('Unable to connect to weather service!', undefined)
              } else if(body.error) {
                  callback('Unable to find location', undefined)
              } else {
                  callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+body.current.temperature+' degress out there. But it feels like '+body.current.feelslike+' degress out.')
              }
            
      })
}

module.exports = forecast