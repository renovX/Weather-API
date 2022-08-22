const express=require('express');
const weatherController=require('../controller/weather')
const router=express.Router();
router.get('/get-weather/:district',weatherController.getWeatherData)
router.get('/add-district/:name/:value',weatherController.addDistrict)
router.get('/district-list',weatherController.getDistrictList)
module.exports=router