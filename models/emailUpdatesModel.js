const mongoose = require('mongoose')
const schema = mongoose.Schema;
const emailSchema = new schema({
    email: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
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



const emailModel = mongoose.model("emails", emailSchema);
module.exports = emailModel