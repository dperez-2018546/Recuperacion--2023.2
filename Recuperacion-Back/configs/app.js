'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000
const taskRoutes = require('../src/task/task.routes')

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use('/task', taskRoutes)

exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server running in port ${port}`)
}