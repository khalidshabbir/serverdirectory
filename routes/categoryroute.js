const express=require("express");
const router=express.Router();
const Categories=require("../models/category")
router.post("/register/categories", async (req, res) => {

    try {
      const addcontact = new Categories({
       name:req.body.category,
       subcategories:req.body.subcategory

      });
      await addcontact.save();
      res.status(201).json(addcontact);
  
      console.log("Your record save successfully");
    } catch (error) {
      console.log(error);
       res.status(422).json(error);
    }
  });
//   ====================================================
router.get("/getdata/categoriesdata", async (req, res) => {
    try {
      const contact = await Categories.find();
      res.status(201).json(contact);
    } catch (error) {
      res.status(422).json(error);
     
    }
  });



// ===================================================

module.exports=router