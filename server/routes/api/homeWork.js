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
        res.send({ success: true, data })
    }
    catch (e) {
        res.send({ success: false, msg: 'Error fetching data', error: e })
    }
})

router.get('/allDates', async (req, res) => {
    try {
        let allhomeWorks = await HomeWork.find({}).select({ 'uniqueId': 1, 'date': 1 }).sort('date')
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

router.post('/updateBulk', async (req, res) => {
    let uData = JSON.parse(req.body.data)
    let keys = Object.keys(uData[0])
    let dataIndex = keys.indexOf('uniqueId')
    keys.splice(dataIndex, 1)
    uData = uData.map((data, index) => {
        data.date = new Date(`${data.uniqueId.substring(0, 4)}-${data.uniqueId.substring(4, 6)}-${data.uniqueId.substring(6, 8)}`)
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
        keys.map(key => {
            result.updates[key] = data[key]
        })
        payload.push(result)
    })
    console.log('in payload', payload)
    let count = { updated: 0, added: 0 }
    uData = await Promise.all(payload.map(async data => {
        try {
            let result = await HomeWork.findOneAndUpdate({ uniqueId: data.uniqueId }, data.updates, {
                new: true,
                upsert: true,
                rawResult: true // Return the raw result from the MongoDB driver
            });
            console.log('result', result.lastErrorObject)
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
        }
        return data
    }))
    res.json({ count })
})



module.exports = router