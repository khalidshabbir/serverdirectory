const {default:mongoose}=require("mongoose")
const mongooose=require("mongoose");
const reviews=new mongooose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    rating:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    }
})
const review=new mongoose.model("reviews",reviews);
module.exports=review;