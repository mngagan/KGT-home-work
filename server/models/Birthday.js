const mongoose = require('mongoose')

const BirthdaySchema = new mongoose.Schema({
    timeStatmp: {
        type: Date,
        default: Date.now()
    },
    name : {
        type : String,
        required : false,
    },
    uniqueId : {
        type : String,
        required : true
    },
    images : {
        type : Array,
        required : false
    },
    date : {
        type : Date,
        required : false
    },
    month : {
        type : Number,
        required : false
    },
    day : {
        type : Number,
        required : false
    }
})

module.exports = Birthday = mongoose.model('birthday', BirthdaySchema)