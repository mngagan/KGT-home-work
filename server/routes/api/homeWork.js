const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')
const HomeWork = require('../../models/HomeWork')
const { json } = require('express')
var fs = require('fs');
const moment = require('moment')
const { db } = require('../../models/HomeWork')

router.get('/latest', async (req, res) => {
    try {
        let data = await HomeWork.find({}).sort({ date: -1 }).limit(1)
        console.log('in latest fetched', data[0].uniqueId, data[0].timeStamp, data[0].date)
        res.send({ success: true, data })
    }
    catch (e) {
        res.send({ success: false, msg: 'Error fetching data', error: e })
    }
})

router.get('/allDates', async (req, res) => {
    try {
        let allhomeWorks = await HomeWork.find({}).select({ 'uniqueId': 1, 'date': 1 }).sort('date')
        // allhomeWorks.sort(function(a,b){
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return new Date(b.date) - new Date(a.date);
        //   });
        res.send({ success: true, data: allhomeWorks })
    } catch (e) {
        res.send({ 'success': false, error: e })
    }
})

router.get('/allHWInfo', async (req, res) => { 
    try {
        let allhomeWorks = await HomeWork.find({}).select(['-images', '-timeStatmp',, '-date', '-__v', '-title', '-_id']).sort('date')
        res.send({ success: true, data: allhomeWorks })
    } catch (e) {
        res.send({ 'success': false, error: e })
    }
})

router.get('/specificHomeWork/:uniqueId', async (req, res) => {
    try {
        let allhomeWorks = await HomeWork.find({ uniqueId: req.params.uniqueId })
        res.send({ success: true, data: allhomeWorks })
    } catch (e) {
        res.send({ 'success': false, msg: 'Error fetching data', error: e })
    }
})

router.post('/addHomeWork', async (req, res) => {
    try {
        let { name, title, updatedBy, description, images = false, youtubeLink = false, date, update, dayNo, prayerTopic } = req.body
        if (update) {
        }
        let uniqueId = moment(date).format('yyyyMMDD')
        let dataToBeUpdated = {
            name, title, updatedBy, description, images, youtubeLink, date, uniqueId, dayNo, prayerTopic
        }
        let result = await HomeWork.findOneAndUpdate({ uniqueId }, dataToBeUpdated, {
            new: true,
            upsert: true,
            rawResult: true // Return the raw result from the MongoDB driver
        });
        res.send({ success: true, data: result, updated: result.lastErrorObject.updatedExisting })
        return
    } catch (error) {
        console.log('error', error)
        res.send({ success: false, msg: 'adding homework failed', error })
    }
})

router.post('/deleteHomeWork', async (req, res) => {
    console.log('in delete homework API')
    try {
        let { uniqueId } = req.body
        let result = await HomeWork.deleteOne({ uniqueId });
        if(result.deletedCount != 0){
            res.send({ success: true, data: result})
        }
        else{
            res.send({ success: false, msg: 'deleting homework failed' })
        }
        // res.send({success : true})
        return
    } catch (error) {
        console.log('error', error)
        res.send({ success: false, msg: 'deleting homework failed', error })
    }
})

router.post('/updateBulk', async (req, res) => {
    let uData = typeof req.body.data == 'string' ?  JSON.parse(req.body.data) : req.body.data
    let keys = Object.keys(uData[0])
    let dataIndex = keys.indexOf('uniqueId')
    keys.splice(dataIndex, 1)
    uData = uData.map((data, index) => {
        data.date = new Date(`${data.uniqueId.substring(0, 4)}-${data.uniqueId.substring(4, 6)}-${data.uniqueId.substring(6, 8)}`)
        data.date = data.date.toISOString()
        return data
    })
    if (keys.indexOf('date') === -1) {
        keys.push('date')
    }
    let payload = []
    uData.map(data => { 
        let result = {
            uniqueId: data.uniqueId,
            updates: {
                uniqueId: data.uniqueId
            }
        }
        let keys = Object.keys(data)
        keys.map(key => {
            result.updates[key] = data[key]
        })
        payload.push(result)
    })
    let count = { updated: 0, added: 0 }
    let success = true, temp, temp2
    temp2 = payload
    uData = await Promise.all(payload.map(async data => {
        try {
            let result = await HomeWork.findOneAndUpdate({ uniqueId: data.uniqueId }, data.updates, {
                new: true,
                upsert: true,
                rawResult: true // Return the raw result from the MongoDB driver
            });
            temp = result
            // data.lastErrorObject = result.lastErrorObject
            if (result.lastErrorObject.updatedExisting) {
                count.updated = count.updated + 1
            }
            else if (!result.lastErrorObject.updatedExisting && result.lastErrorObject.upserted) {
                count.added = count.added + 1
            }
            data.success = true
        }
        catch (e) {
            console.log('in error', e)
            data.success = false
            success = false
        }
        return data
    }))
    res.json({ count, success, temp, temp2 })
})



module.exports = router