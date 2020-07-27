const mongoose = require('mongoose')
const schema = mongoose.Schema;
const eventSchema = new schema({
    title: {
        type: String
    },
description: {
        type: String
    },
    imagesPath: {
        type: String
    },

    location: {
        type: String
    },
    venue: {
        type: String
    },
    startDate: {
        type: String
    },
    participant:[
        {
            fname:"",
            lname:"",
            email:"",
            phone:""
        }
    ],
    endDate: {
        type: String
    },
    time: {
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



const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel