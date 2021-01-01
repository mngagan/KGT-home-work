const mongoose = require('mongoose')

const HomeWorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
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
        required : false
    },
    prayerTopic : {
        type : String,
        required: false
    },
    images: {
        type: String,
    },
    youtubeLink: {
        type: String
    },
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    updatedBy: {
        type: String,
        required: false
    },
    uniqueId : {
        type : String,
        required : true
    }
})

module.exports = HomeWork = mongoose.model('homeWork', HomeWorkSchema)