const axios=require('axios')
const cheerio=require('cheerio')
const express=require('express')
const mongoose  = require('mongoose')
const weatherRoutes=require('./routes/weather')
const app=express()
app.get("/",(req,res,next)=>
{
    res.write("Welcome\n")
    res.write("'/getweather/<district-name>' to get weather\n")
    res.write("'/add-district/<district-name>/<district-code>'  to add a new district\n")
    res.write("'/district-list' To list all districts available")
    res.end()
    next()
})
app.use(weatherRoutes)
mongoose.connect("mongodb+srv://renovx:xterminator66@cluster0.eliqarh.mongodb.net/weatherapi?retryWrites=true&w=majority")
.then(()=>
{
    console.log("Connected")
    app.listen(4000)
})
.catch(err=>
    {
        console.log(err)
    })