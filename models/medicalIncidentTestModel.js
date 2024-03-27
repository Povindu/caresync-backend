const mongoose= require('mongoose')

const Schema = mongoose.Schema

const MedicalIncidentSchema= new Schema({
   //Test Modal data
   incidentType:{
        type:String,
        required:true,
    },
    date:{
        type: Date,
        required:true,
    },
    testType:{
        type:String,
        required:true,
    },

    testProvider:{
        type:String,
        required:true,
    },
    //Symptom Modal data

    SymtopDescription:{
        type:String,
        required:true,
    }

   
    
},
{timestamps:true})

module.exports=mongoose.model('MedicalIncident', MedicalIncidentSchema)

