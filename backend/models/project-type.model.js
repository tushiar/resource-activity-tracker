// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const projectTypeSchema = new Schema({
    projectTypeName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    projectTypeStatus:{
        type: Boolean,
        required: false,
        default: true,
    },
},{
timestamps: true,
collection: 'projects'
});

const ProjectType = mongoose.model('ProjectType', projectTypeSchema);

module.exports = ProjectType

