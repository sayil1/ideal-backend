const mongoose = require('mongoose')
const schema = mongoose.Schema;
const pearsonSchema = new schema({
    surName: {
        type: String
    },
    firstName:{
          type:String
    },
    middleName: {
        type: String
    },
    date: {
        type: Date
    },
    email: {
        type: String
    },
    contactAdress: {
        type: String
    },
    country: {
        type: String
    },
    examDate:{
        type: Date
    },
    examCenter: { 
        type: String
    },
    passport:{
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now,
        once: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
})



const pearsonModel = mongoose.model("pearson", pearsonSchema);
module.exports = pearsonModel