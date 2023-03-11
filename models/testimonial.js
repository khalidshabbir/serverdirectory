const {default:mongoose}=require("mongoose")
const mongooose=require("mongoose")
const testimonial=new mongooose.Schema({
    name:{
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
const testimo=new mongoose.model("testimonial",testimonial)
module.exports=testimo;