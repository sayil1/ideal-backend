const mongoose = require('mongoose')
const schema = mongoose.Schema;
const contSchema = new schema({
      fname:{
          type:String
      },

      lname:{
          type:String
      },
      email:{
          type:String
      },
      phone:{
          type: String
      },
      message:{
          type: String
      },
      created_date :{
          type: Date,
          default: Date.now,
          once:true
      },

      updated:{
          type:Date,
          default: Date.now
      }
})



const contModel = mongoose.model("contacts", contSchema);
module.exports = contModel