const request=require('request')

var forecast=((latitude,longitude,callback)=>{
    var url="http://api.weatherstack.com/current?access_key=a4dc6b448c1cd7d39ee6d01e2a167a7b&query="+latitude+","+longitude+"&units=f"

    request({url:url,json:true},(error,{body})=>{
            if(error){
                callback("unable to connect to weather services!")
            }else if(body.error){
                callback('error loading data from weather server')
            }else{
                callback(undefined,body.current.weather_descriptions+". It is currently "+body.current.temperature+" degrees fahrenheit out. It feels like "+body.current.feelslike+" degrees fahrenheit. The humidity is"+body.current.humidity+"%")
            }
})})

module.exports=forecast