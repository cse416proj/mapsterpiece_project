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
const postRouter = require('./routes/post-router')
app.use('/api-post', postRouter)

// initalize database
const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// export app
module.exports = app;