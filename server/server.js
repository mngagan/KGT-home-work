const express = require('express')
const connectDB = require('./config/db')
const path = require('path');

const app = express()
var bodyParser = require('body-parser')

// connect to db
connectDB()

// Init middleware
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
// app.use(express.json({extended : false}))
// app.use(express.bodyParser({limit: '2mb'}))
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

// app.get('/', (req, res) => {
//     res.send('API RUNNING')
// }) 

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/homeWork', require('./routes/api/homeWork'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))
app.get('*', (req,res) =>{
    // console.log('in get all')
    res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});


 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
    console.log('path', path.join(__dirname, '..', 'build/index.html'), path.join(__dirname, '..', 'build'))
})