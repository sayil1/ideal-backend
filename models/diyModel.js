const mongoose = require('mongoose')
const schema = mongoose.Schema;
const diySchema = new schema({
    title: {
        type: String
    },
    Description: {
        type: String
    },
    imagesPath: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    sold:{
       type:Boolean,
       default: false
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



const diyModel = mongoose.model("DIY", diySchema);
module.exports = diyModel