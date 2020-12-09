const mongoose = require('mongoose')

const HomeWorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    timeStatmp: {
        type: Date,
        default: Date.now()
    },
    date : {
        type : String,
        required : true,
    },
    images: {
        type: String,
    },
    youtubeLink: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    updatedBy: {
        type: String,
        required: true
    }
})

module.exports = HomeWork = mongoose.model('homeWork', HomeWorkSchema)