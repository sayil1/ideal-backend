const mongoose = require('mongoose')
const schema = mongoose.Schema;
const registrationSchema = new schema({
    surname:{
       type: String
    },
    firstName: {
        type: String
    },
    middleName:{
       type: String
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    contactAddress:{
        type: String
    },
    countryOfBirth:{
        type:String
    },
    examDate:{
        type:Date
    },
    examCenter:{
        type:String
    },
    passPort:{
        type:String
    },
    institutionToSendScores:{
        type:String
    },
    premiumAccount:{
        userName: String,
        password:String
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

const registrationModel = mongoose.model("registration", registrationSchema);
module.exports = registrationModel