const {default:mongoose}=require("mongoose")
const mongooose=require("mongoose");
const category=new mongooose.Schema({
name:{
    type:String,
},
subcategories:{
    type:String,
  
}
})
const categories=new mongoose.model("category",category);
module.exports=categories;