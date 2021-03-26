// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const releaseTypeSchema = new Schema({
    resourceTypeName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    releaseTypeStatus:{
        type: String,
        required: false,
        // default: true,
    },
},{
timestamps: true,
collection: 'resourcetypes'
});

const ResourceType = mongoose.model('ResourceType', releaseTypeSchema);

module.exports = ResourceType

