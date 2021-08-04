const request = require('request')

const forcast = (latitude, longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=954135d0e96e2930cccedcf2089d66b4&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body} ) => {

        if(error){
        
            callback('unable to open weather forcasing app',undefined)
          }
          else if(body.error){
      
              callback('unable to find location',undefined)
          }
          else{
              //for display entire data
              callback(undefined,body.current.weather_descriptions[0] + '. it is currently '+ body.current.temperature +' and forcast '+ body.current.feelslike + ' is cool')
          }  
    })
}

module.exports = forcast
// -------------------(13,changes in {body} and remove request)