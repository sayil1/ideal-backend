const mongoose = require('mongoose')
const schema = mongoose.Schema;
const contestSchema = new schema({
    title: {
        type: String
    },

    shortDescription: {
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



const contestModel = mongoose.model("contests", contestSchema);
module.exports = contestModel