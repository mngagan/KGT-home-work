const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    timeStatmp: {
        type: Date,
        default: Date.now()
    },
    date : {
        type : String,
        required : false,
    },
    uniqueId : {
        type : String,
        required : true
    }
})

module.exports = Birthday = mongoose.model('birthday', BirthdaySchema)