const {default:mongoose}=require("mongoose")
const mongooose=require("mongoose")
const aboutus=new mongooose.Schema({
    heading:{
        type:String,
        require:true
    },
    section:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
})
const about=new mongoose.model("aboutus",aboutus)
module.exports=about;