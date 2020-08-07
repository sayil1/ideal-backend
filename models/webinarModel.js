const mongoose = require('mongoose')
const schema = mongoose.Schema;
const WebinarSchema = new schema({
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
    exactVenue: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    time: {
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



const webinarModel = mongoose.model("Webinars", WebinarSchema);
module.exports = webinarModel