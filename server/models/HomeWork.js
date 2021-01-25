const mongoose = require('mongoose')

const HomeWorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        dafault : ''
    },
    timeStatmp: {
        type: Date,
        default: Date.now()
    },
    date : {
        type : String,
        required : false,
    },
    dayNo : {
        type : String,
        required : false,
        dafault : ''
    },
    prayerTopic : {
        type : String,
        required: false,
        dafault : ''
    },
    images: {
        type: String,
        dafault : ''
    },
    youtubeLink: {
        type: String,
        dafault : ''
    },
    title: {
        type: String,
        required: false,
        dafault : ''
    },
    description: {
        type: String,
        required: false,
        dafault : ''
    },
    updatedBy: {
        type: String,
        required: false,
        dafault : ''
    },
    uniqueId : {
        type : String,
        required : true
    }
})

module.exports = HomeWork = mongoose.model('homeWork', HomeWorkSchema)