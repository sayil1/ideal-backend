const mongoose = require('mongoose')
const schema = mongoose.Schema;
const projSchema = new schema({
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
      interests:{
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



const projModel = mongoose.model("projects", projSchema);
module.exports = projModel