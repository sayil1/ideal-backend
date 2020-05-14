const mongoose = require('mongoose')
const schema = mongoose.Schema;
const booksSchema = new schema({
    title: {
        type: String
    },
    Description: {
        type: String
    },
    // category: {
    //     type: String
    // },
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
    topTrend: { 
        type: Date,
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



const bookModel = mongoose.model("Books", booksSchema);
module.exports = bookModel