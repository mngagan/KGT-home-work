const express = require('express')
const connectDB = require('./config/db')

const app = express()

// connect to db
connectDB()

// Init middleware
app.use(express.json({extended : false}))

// app.get('/', (req, res) => {
//     res.send('API RUNNING')
// })

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/homeWork', require('./routes/api/homeWork'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))

 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})