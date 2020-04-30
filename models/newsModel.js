const mongoose = require('mongoose')
const schema = mongoose.Schema;
const newsSchema = new schema({
    caption:{
       type: String
    },
    message: {
        type: String
    },
    startDate:{
       type: String
    },
    endDate:{
        type: String
    },
    endTime:{
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

const newsModel = mongoose.model("news", newsSchema);
module.exports = newsModel