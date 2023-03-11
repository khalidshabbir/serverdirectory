const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const company = new mongooose.Schema({

    name:{
        type:String,
         unique:true
    },
    category:{
        type:String,
        
    },
    subcategory:{
        type:String, 
    },
    address:{
        type:String,
    },
    city:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String,
    },
    phone:{
        type:String,

    },
    website:{
        type:String,
    },
    timing:{
        type:String,
    },
    contractPerson:{
     type:String,
    },
    establish:{
        type:String,
    },
    employees:{
    type:String
    },
    description:{
        type:String
    },
    img:{
        type:String
    }

})
const companies = new mongoose.model("company", company);
  
module.exports = companies;
