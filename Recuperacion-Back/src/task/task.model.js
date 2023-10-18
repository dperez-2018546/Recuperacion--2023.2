'use strict'

const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
}, { versionKey: false })

module.exports = mongoose.model('Task', taskSchema)