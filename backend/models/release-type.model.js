// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const releaseTypeSchema = new Schema({
    releaseTypeName:{
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
collection: 'releasetypes'
});

const ReleaseType = mongoose.model('ReleaseType', releaseTypeSchema);

module.exports = ReleaseType

