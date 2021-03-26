const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    applicationName:{type:String, required:true},
    status:{type:String, required:true}
},{
    timestamps:true,
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application