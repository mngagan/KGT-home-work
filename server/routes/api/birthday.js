const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const Birthday = require('../../models/Birthday')
const { json } = require('express')
var fs = require('fs');
const moment = require('moment')
const { v4: uuidv4 } = require('uuid');

router.post('/add', async (req, res) => {
    try {
        let { date, name, images } = req.body
        let uniqueId = uuidv4()
        let dataToBeUpdated = {
            date, name, images , uniqueId
        }
        dataToBeUpdated.month = new Date(date).getMonth()
        dataToBeUpdated.day = new Date(date).getDate()
        let result = await Birthday.findOneAndUpdate({ uniqueId }, dataToBeUpdated, {
            new: true,
            upsert: true,
            rawResult: false // Return the raw result from the MongoDB driver
        });
        res.send({ success: true, message : 'Data uploaded succesfully' })
        return
    } catch (error) {
        console.log('error', Object.keys(error), error.code)
        if(error.code == 'ERR_OUT_OF_RANGE'){
            res.send({ success: false, msg: 'Images size exceeded. Please check all the images combined should have size less than 15mb', error })

        }
        else{
            res.send({ success: false, msg: 'Adding failed, Please try again', error })

        }
    }
})

router.get('/all', async (req, res) => {
    try {
        let { date, name, images } = req.body
        let uniqueId = uuidv4()
        let dataToBeUpdated = {
            date, name, images : [], uniqueId
        }
        console.log('in get all called')
        let result = await Birthday.find({})
        // console.log('in after updating data to bday', result)
        res.send({ success: true, data: result })
        return
    } catch (error) {
        console.log('error', error)
        res.send({ success: false, msg: 'adding birthday failed', error })
    }
})

router.get('/today', async (req, res) => {
    try{
        let month = new Date().getMonth()
        let day = new Date().getDate()
        // day = 16
        let result =  await Birthday.find({month, day})
        if(result){
            res.send({success : true, data : result})
        }
        else{
            res.send({success : false})

        }
    }
    catch(e){
        console.log('in error caught while fetching todays birthday', e)
        res.send({success : false})

    }
})


module.exports = router