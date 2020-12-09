const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const HomeWork = require('../../models/HomeWork')
const { json } = require('express')

router.get('/latest', async (req, res) => {
    res.send('latest homework')
})

router.get('/allDates', async (req, res) => {
    let allhomeWorks = await HomeWork.find({date : '09-12-2020'});
    console.log('after fetching all data', allhomeWorks)
    res.send(allhomeWorks )
})

router.get('/specificHomeWork', async (req, res) => {
    res.send('specific day')
})

router.post('/addHomeWork', async (req, res) => {
    console.log('in add homework', req.body)
    let { name, title, updatedBy, description, images = false, youtubeLink = false, date } = req.body
    homeWork = new HomeWork({
        name, title, updatedBy, description, images, youtubeLink, date
    })

    await homeWork.save()
    console.log('after saving data', homeWork)
    res.send(JSON.stringify(homeWork))
})



module.exports = router