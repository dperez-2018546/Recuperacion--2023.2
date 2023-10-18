'use strict'

const express = require('express')
const api = express.Router()
const taskController = require('./task.controller')

api.get('/test', taskController.test)
api.post('/addTask', taskController.addTask)
api.put('/updateTask/:id', taskController.updateTask)
api.delete('/deleteTask/:id', taskController.deleteTask)
api.get('/getTask', taskController.getTask)


module.exports = api