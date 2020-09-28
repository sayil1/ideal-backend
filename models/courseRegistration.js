const mongoose = require('mongoose')
const schema = mongoose.Schema;
const courseSchema = new schema({
    fname:{
       type: String
    },
    lname: {
        type: String
    },
    email:{
       type: String
    },
    phone:{
        type: String
    },
    session:{
        type: String
    },
    courses:{},

    created_date: {
        type: Date,
        default: Date.now,
        once: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
    
}
,
)

const courseModel = mongoose.model("courseReg", courseSchema);
module.exports = courseModel