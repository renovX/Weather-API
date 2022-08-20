const axios=require('axios')
const cheerio=require('cheerio')
const express=require('express')
const weatherRoutes=require('./routes/weather')
const app=express()

app.use(weatherRoutes)
app.use("/",(req,res,next)=>
{
    res.write("Welcome\n'/getweather/<district-name>' to get weather\nadd-district/<district-name>/<district-code>'  to add a new district\n'/district-list' To list all districts available")
    res.write("'/getweather/<district-name>' to get weather\n")
    res.write("'/add-district/<district-name>/<district-code>'  to add a new district\n")
    res.write("'/district-list' To list all districts available")
    res.end()
    next()
})

app.listen(4000)