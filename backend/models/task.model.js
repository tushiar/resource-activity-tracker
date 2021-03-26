// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    taskName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    taskStatus:{
        type: String,
        required: false,
        // default: true,
    },
},{
timestamps: true,
collection: 'tasks'
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task

