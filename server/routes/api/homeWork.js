const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const HomeWork = require('../../models/HomeWork')
const { json } = require('express')
var fs = require('fs');

router.get('/latest', async (req, res) => {
    try{
        let data =  await HomeWork.find({}).sort({date : -1}).limit(1)

        // if(data.status === 200){
            res.send({success : true, data})
            // return
        // }
        // res.send({success : false, msg : 'error getting latest homework'})
    }
    catch(e){
        res.send({success : false, msg : 'error getting latest homework', error : e})
    }
})

router.get('/allDates', async (req, res) => {
    let allhomeWorks = await HomeWork.find({ date: '09-12-2020' });
    res.send(allhomeWorks)
})

router.get('/specificHomeWork', async (req, res) => {
    var imgPath = 'C:\fakepath\image0.PNG';
    res.send('specific day')
})

router.post('/addHomeWork', async (req, res) => {
    try {
        let { name, title, updatedBy, description, images = false, youtubeLink = false, date } = req.body
        homeWork = new HomeWork({
            name, title, updatedBy, description, images, youtubeLink, date
        })
        await homeWork.save()
        // if(homeWork.status === 200 ){
            res.send({ success: true, data: homeWork })
            // return
        // }
        // res.send({ success: false, msg: 'adding homework failed' })
    } catch (error) {
        res.send({ success: false, msg: 'adding homework failed', error })
    }
})



module.exports = router