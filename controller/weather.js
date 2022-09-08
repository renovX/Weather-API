const axios=require('axios')
const cheerio=require('cheerio')
const express = require('express')
const District=require('../models/district.js')
function generate(string,string1)
{
    const i=string.search("Current")
    const j=string.search("Latest")
    const k=string.search("Visib")
    const l=string.search("Pressure")
    const m=string.search("Humidity")
    const n=string.search("Dew Point")

    //in us this will be in 
    const temperature=parseInt(string1.substring(3,5).match(/\d+/)[0]);
    const cloud=string1.substring(0,string1.search("F")).trim()
    const wind=string1.substring(string1.search("Wind")+6).trim();

    const location=string.substring(0,i).split(":")[1].trim()
    const visibility=parseInt(string.substring(k,l).split(":")[1].trim().match(/\d+/)[0]);
    const pressure=parseInt(string.substring(l,m).split(":")[1].trim().match(/\d+/)[0]);
    const humidity=parseInt(string.substring(m,n).split(":")[1].trim().match(/\d+/)[0]);
    const dewp=parseInt(string.substring(n).split(":")[1].trim().match(/\d+/)[0]);
    return {temperature:temperature,
        weather_location:location,
        visibility:visibility,
        pressure:pressure,
        humidity:humidity,
        dewp:dewp,wind:wind}

    
}

exports.getWeatherData=(req,res,next)=>
{
    const district_name=req.params.district
    District.findByName(district_name,district=>
        {
            if(district)
            {
                let URL
                const value=district.value;
                if(district.isNum)URL='https://www.timeanddate.com/weather/'+value
                else
                URL='https://www.timeanddate.com/weather/india/'+value
                axios({
                    method:'get',
                    url:URL}
                )
                .then(webData=>
                    {
                        const $=cheerio.load(webData.data)
                        const data=$(".table.table--left.table--inner-borders-rows").text()
                        const data2=$("#qlook").text()
                        const clouds=$('#cur-weather').attr('title')
                        //console.log(clouds)
                        var ob=generate(data.toString(),data2.toString())
                        ob.clouds=clouds
                        res.send(ob)
                        
                    
                    })
                .catch(err=>{console.log(err)})
            
            }
            else
            {
                res.send("District Not found")
            }
        })
}
exports.addDistrict=(req,res,next)=>
{
    const name=req.params['name']
    const value=req.params['value']
    District.findByName(name,district=>
        {
            if(district)
            res.send("District already is presnt")
        
            else
            {
                const isNum=value[0]=="@"?true:false
                const newDistrict=new District(name,value,isNum)
                District.addDistrict(newDistrict)
                res.send("Success")                
            }
        })
    
    
}
exports.getDistrictList=(req,res,next)=>
{
    
    District.findAll(districts=>
        {
            const list=[]
            districts.forEach(district=>
                {
                    list.push(district.name)
                }
                )
            res.send(list)
        })
    
}