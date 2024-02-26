const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stepCountSchema = new Schema({
    date:{
        type:String,
        required: true
    },
    stopwatchTime:{
        type: String,
        required:true
    },
    step:{
        type:Number,
        required:true
    },
    distance:{
        type:Number,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('stepCounterTestResult',stepCountSchema)