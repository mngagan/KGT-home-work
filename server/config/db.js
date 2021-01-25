const mongoose = require('mongoose')
const config = require('config')
require('dotenv').config();
var db = process.env.mongoURI || config.get('mongoURI')
if(process.env.NODE_ENV == 'development'){
    db  = 'mongodb://127.0.0.1:27017/KgtHomeWork'
}
console.log('connected to ', db)


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