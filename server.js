require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Routers
app.use('/user', require('./routers/userRouter'))
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/upload'))

// Connect to mongoose
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.get('/', (req, res) => {
    res.json({msg: "Welcome my channel , please subcribe for us. Thanks"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})