const axios=require('axios')
const cheerio=require('cheerio')
const express=require('express')
const weatherRoutes=require('./routes/weather')
const app=express()
let port=process.env.PORT||3000
app.get("/",(req,res,next)=>
{
    res.write("Welcome\n'/getweather/<district-name>' to get weather\nadd-district/<district-name>/<district-code>'  to add a new district\n'/district-list' To list all districts available")
    res.write("'/get-weather/<district-name>' to get weather\n")
    res.write("'/add-district/<district-name>/<district-code>'  to add a new district\n")
    res.write("'/district-list' To list all districts available")
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