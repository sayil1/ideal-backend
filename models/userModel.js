const mongoose = require('mongoose')
const schema = mongoose.Schema;
const userSchema = new schema({
    email: {
        type: String
    },
    password:{
          type:String
    },
    firstName: {
        type: String
    },
    lastName: {
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

const userModel = mongoose.model("user", userSchema);
module.exports = userModel