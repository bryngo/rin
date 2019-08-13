// Require mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const activityLog = new Schema({
    userID       : String, // this is a Snowflake https://discord.js.org/#/docs/main/master/typedef/Snowflake
    timeIn       : Date,
    timeOut      : Date,
    activityName : String
});

module.exports = mongoose.model('activityLog', activityLog);
