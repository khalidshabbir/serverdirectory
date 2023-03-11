const express = require("express");
const router = express.Router();
const multer = require("multer");
const Company=require("../models/company");
// =========================================================
// ====================== register new admin users============================
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      callback(null, Date.now() + '_' +file.originalname);
    },
  });
  const uploadimg = multer({ storage: storage });
// ======================================================
router.post( "/register/company",
  uploadimg.single("image"),
  async (req, res) => {
    const file = req.image; 
    try {
      console.log(req.body)
      const usere = await Company.findOne({ name: req.body.name });
      if (usere!=null&&usere!=null){
        return res.status(500).json("This comapny already exist")
      }
      const listcompany = new Company({
        name: req.body.name,
        category: req.body.category,
        subcategory: req.body.subcategory,
        address: req.body.address,
        city:req.body.city,
        email:req.body.email,
        mobile: req.body.mobile,
        phone: req.body.phone,
        website: req.body.website,
        timing: req.body.timing,
        contractPerson: req.body.contractperson,
        establish:req.body.establish,
        employees:req.body.employees,
        description:req.body.description,
        img:req.file.filename
      });
      await listcompany.save();
      res.status(201).json("Your company listed Successfully!");
     
       
    } catch (error) {
        res.status(500).send({ message: "Internal Server error" });

        console.log(error.message)

    }
  }
);
// ===================================================================
router.get("/company/getdata", async (req, res) => {
  try {
    const users = await Company.find();
    res.status(201).json(users);

  } catch (error) {
    res.status(422).json(error);
    console.log("There is an error in get userdata");
  }
});
// ========================Get specific company details=========================
router.get("/company/details/:id", async (req, res) => {

  try {  
    const { id } = req.params;
    
    const userss = await Company.findById({ _id: id });

    res.status(201).json(userss);
  } catch (error) {
    res.status(422).json(error);
    console.log("This catch part work here");
  }
});
// ========================================================
router.delete("/companiesdetails/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
  
    const deletuser = await Company.findByIdAndDelete({ _id: id });
    res.status(201).json(deletuser);

  } catch (error) {
    res.status(422).json(error);
  }
});
// =====================Update Company Details==========================
router.post( "/update/companydetails",uploadimg.single("image"),async (req, res) => {
 
  try {
   
    if(req.file){
      const userdatails={
        name: req.body.name,
        category: req.body.category,
        subcategory: req.body.subcategory,
        address: req.body.address,
        city:req.body.city,
        email:req.body.email,
        mobile: req.body.mobile,
        phone: req.body.phone,
        website: req.body.website,
        timing: req.body.timing,
        contractPerson: req.body.contractperson,
        establish:req.body.establish,
        employees:req.body.employees,
        description:req.body.description,
        img:req.file.filename

      } 
const update=await Company.findByIdAndUpdate(req.body.id, userdatails, {
new: true,
});
    }else{
     
      const userdatails={
        name: req.body.name,
        category: req.body.category,
        subcategory: req.body.subcategory,
        address: req.body.address,
        city:req.body.city,
        email:req.body.email,
        mobile: req.body.mobile,
        phone: req.body.phone,
        website: req.body.website,
        timing: req.body.timing,
        contractPerson: req.body.contractperson,
        establish:req.body.establish,
        employees:req.body.employees,
        description:req.body.description,
        img:req.body.imageurl

      } 

const update=await Company.findByIdAndUpdate(req.body.id, userdatails, {
new: true,
});
        
    }



  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
);
// ================================================================
module.exports = router;
