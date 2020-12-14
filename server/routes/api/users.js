const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../../models/User')

router.get('/', async (req, res) => {
    
    user = new User({
        name : 'from users'
    })
    await user.save()

    res.send('fine')

})

module.exports = router