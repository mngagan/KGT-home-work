const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const HomeWork = require('../../models/HomeWork')
const { json } = require('express')
var fs = require('fs');
const moment = require('moment')

router.get('/latest', async (req, res) => {
    try {
        let data = await HomeWork.find({}).sort({ date: -1 }).limit(1)

        // if(data.status === 200){
        res.send({ success: true, data })
        // return
        // }
        // res.send({success : false, msg : 'error getting latest homework'})
    }
    catch (e) {
        res.send({ success: false, msg: 'error getting latest homework', error: e })
    }
})

router.get('/allDates', async (req, res) => {
    try {
        let allhomeWorks = await HomeWork.find({}).select({ 'uniqueId': 1, 'date': 1 }).sort('date')
        res.send({ success: true, data: allhomeWorks })
        // res.send(allhomeWorks)

    } catch (e) {
        res.send({ 'success': false, error: e })
    }
})

router.get('/specificHomeWork/:uniqueId', async (req, res) => {
    console.log('in get specific date', req.params.uniqueId)
    // var imgPath = 'C:\fakepath\image0.PNG';
    // res.send('specific day' + req.params.uniqueId)
    try {
        let allhomeWorks = await HomeWork.find({ uniqueId: req.params.uniqueId })
        res.send({ success: true, data: allhomeWorks })
    } catch (e) {
        res.send({ 'success': false, error: e })
    }
})

router.post('/addHomeWork', async (req, res) => {
    try {
        let { name, title, updatedBy, description, images = false, youtubeLink = false, date, update } = req.body
        if (update) {
            //should update in existing date
        }
        let uniqueId = moment(date).format('yyyyMMDD')
        // let alreadyExisting = await HomeWork.find({ uniqueId });
        // console.log('already existing', alreadyExisting)
        // if (alreadyExisting.length) {
        //     res.send({ success: 200, alreadyExisting: true })
        //     return
        // }
        // else {
        // res.send(alreadyExisting)
        // homeWork = new HomeWork({
        //     name, title, updatedBy, description, images, youtubeLink, date, uniqueId
        // })
        let dataToBeUpdated = {
            name, title, updatedBy, description, images, youtubeLink, date, uniqueId
        }
        console.log('before result')
        let result = await HomeWork.findOneAndUpdate({ uniqueId }, dataToBeUpdated, {
            new: true,
            upsert: true,
            rawResult: true // Return the raw result from the MongoDB driver
        });
        // console.log('after result')
        // res.send(result)
        // if(result.lastErrorObject.updatedExisting){
        //     res.send({ success: true, data: homeWork })
        // }
        // await homeWork.save()
        // if(homeWork.status === 200 ){ 
        res.send({ success: true, data: result, updated: result.lastErrorObject.updatedExisting })
        return
        // }
        // }
        // res.send({ success: false, msg: 'adding homework failed' })
    } catch (error) {
        console.log('error', error)
        res.send({ success: false, msg: 'adding homework failed', error })
    }
})



module.exports = router