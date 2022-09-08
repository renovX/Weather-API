const axios=require('axios')
const cheerio=require('cheerio')
const express=require('express')
const weatherRoutes=require('./routes/weather')
const app=express()
let port=process.env.PORT||3000
app.get("/",(req,res,next)=>
{
    res.write("Welcome\n'/get-weather/<district-name>' to get weather\n'/add-district/<district-name>/<district-code>'  to add a new district\n'/district-list' To list all districts available")
    res.write("\n\nNote:\n\tTemperatute in deg C\n\tVisibility in km\n\tPressure in mbar\n\tDew Point in deg C\n")
    res.write("\n\nAll weather data is taken from https://www.timeanddate.com/")
    res.end()
    next()
})
app.use(weatherRoutes)
app.use((req,res,next)=>
{
    req.statusCode=404;
    res.send("404 Not Found")
})

app.listen(port)