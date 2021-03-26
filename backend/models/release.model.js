// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const releaseSchema = new Schema({
    applicationName:{type: String, required:true},
    releaseType:{ type: String, required:true},
    projectType:{type: String, required:true},
    releaseName:{type: String, required: true},
    // type:{type: String, required: true},
    // status:{type: String, required: true},
},{
    collection: "releases",
    timestamps: true,
});


const Release = mongoose.model('Release', releaseSchema);

module.exports = Release;