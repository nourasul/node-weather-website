const request = require('request')

const geocode = (Address,callback)=>{//callback is the function we will call once we have the lat& long
    url='http://api.positionstack.com/v1/forward?access_key=55d2b6a134aa45d56f413897cdb84149&query='+Address+'&limit=1'
    
    request({url: url, json: true},(error, response) =>{
        if (error){
            callback('Unable to connect to location  service',undefined) //we don't need to provide the 2nd argument, data will be undifiend since there's no response   
        }else if (response.body.error || response.body.data.length ==0){
            callback('Unbale to find location, Try another search',undefined)
        }else{
            const location= {
                latitude:response.body.data[0].latitude ,
                longitude:response.body.data[0].longitude,
                city:response.body.data[0].label
            }
            callback(undefined,location)
        }
    })
}
module.exports= geocode
