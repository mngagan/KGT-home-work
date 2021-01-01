const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config();
const db = process.env.mongoURI || config.get('mongoURI')

console.log('database connected to ', process.env.mongoURI)

const connectDB = async () => {
    try {
        await mongoose.connect(db,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useCreateIndex : true,
                useFindAndModify : false
            }
        )
        console.log('MONGODB CONNECTED  YAAY')
    }
    catch (e) {
        console.error('error',e)
        // Exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB