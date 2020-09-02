const request=require('request')

var geocode=((address,callback)=>{

    var geourl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURI(address)+".json?access_token=pk.eyJ1IjoidmlqYXlyYW8xMTAxMjUiLCJhIjoiY2tlamRiOGhsMGk0YzJ4cGkzMmRpZWNoZCJ9.DU6ddTGnPuPl1i3WbVfLJQ&limit=1"
    request({url:geourl,json:true},(error,{body})=>{
        //console.log(body)
        if(error){
           callback("unable to connect to location services!")
        }else if(body.features==undefined){
            callback('unable to find location. try another search!')
        }
        else if(body.features.length==0){
            callback('unable to find location. try another search!')
        }else{
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name})
        }
    })

})

module.exports=geocode