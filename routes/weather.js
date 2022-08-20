const express=require('express');
const weatherController=require('../controller/weather')
const router=express.Router();
router.get('/getweather/:district',weatherController.getWeatherData)
router.get('/add-district/:name/:value',weatherController.addDistrict)
router.get('/district-list',weatherController.getDistrictList)
module.exports=router