// node apis to be used
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// create app
const app = express()

// set up middleware
app.use(cors({
    origin: ["http://localhost:3000", "http://mapsterpiece.online"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set up router as middleware
const authRouter = require('./routes/auth-router')
app.use('/auth', authRouter)
const mapRouter = require('./routes/map-router')
app.use('/map', mapRouter)
const postRouter = require('./routes/post-router')
app.use('/api-post', postRouter)
// const userRouter = require('./routes/user-router')
// app.use('/user', userRouter)
const storeRouter = require('./routes/store-router')
app.use('/api', storeRouter)

// initalize database
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// export app
module.exports = app;