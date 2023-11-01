// Import libraries
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

// Set up server at port 4000
dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express()

// Set up middleware
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// // Our routers (ex. auth) will act as our middleware
// const authRouter = require('./routes/auth-router')
// app.use('/auth', authRouter)

// // Init & connect to our mongoose database
// const db = require('./db')
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Server will listen to client
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))