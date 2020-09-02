const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./src/geocodes')
const forecast=require('./src/forecast')

const app=express()
const page=path.join(__dirname,'./public')
const viewspath=path.join(__dirname,"./templates/views")
const partialpath=path.join(__dirname,"./templates/partials")
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)


app.use(express.static(page))

app.get('',(req,res)=>{
res.render('index',{
title:'Weather',
name:"vijay Rao"
})
})
app.get('/about',(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"vijay Rao"
    })
})
app.get('/help',(req,res)=>{
     res.render("help",{
         title:"help page",
         name:"vijay Rao",
         helptext:"This is some help text"
     })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you should provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
            
        })
    })
    })
    app.get('/help/*',(req,res)=>{
        res.render('404',{
            title:'404',
            name:"Vijay Rao",
            errorMessage:"Help Article Not Found"
        })
    })
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Vijay Rao",
        errorMessage:"Page Not Found"
    })
})
app.listen(8080,()=>{
    console.log("server running.....")
})
