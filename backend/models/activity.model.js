// const { Schema, Mongoose } = require("mongoose");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const individualHourSchema = new Schema({
//     dateName: {type: String, required: true},
//     datePlotted: {type: String, required: true}

// })
// const hourSchema =  new Schema({
//     applicationName:{type: String, required: true},
//     releaseName:{type: String, required: true},
//     taskName:{type: String, required: true},
//     hoursRow: [individualHourSchema]

// })
const activitySchema = new Schema({
    year:{type: String, required:true},
    month:{ type: String, required:true},
    timeslot:{type: String, required:true},
    applicationName:{type: String, required: true},
    releaseName:{type: String, required: true},
    taskName:{type: String, required: true},
    hours: {}
},{
    collection: "activities",
    timestamps: true,
});


const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;