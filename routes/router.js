const express = require("express");
const router = express.Router();
const multer = require("multer");
const adminusers=require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ======================================================================

// -=================Get All users===============================
router.get("/adminusers/getdata", async (req, res) => {

    try {
  
      const users = await adminusers.find();
      res.status(201).json(users);
  
    } catch (error) {
      res.status(422).json(error);
      console.log("There is an error in get userdata");
    }
  });

//   ============================================================
// =================================================================

// ===========================Delete it user==========================================
router.delete("/adminusers/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sizeis = await adminusers.countDocuments({});
    if(sizeis>=2){

      const deletuser = await adminusers.findByIdAndDelete({ _id: id });
      res.status(201).json(deletuser);
    }else{
      res.status(422).json("You cna't delete the last user")
    }


  } catch (error) {
    res.status(422).json(error);
  }
});
// ===========================Delete admin user==========================================





// =======================================================
// ==================Admin Login users==========================

router.post("/login/users", async (req, res) => {
  
	try {
	
		const user = await adminusers.findOne({ email: req.body.email });
   
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
    console.log(validPassword)
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
			
			let jwtSecretKey = "khalidsecreetkey";
			let data = {
				time: Date(),
				userId: 12,
			}
     
			const token = jwt.sign(data, jwtSecretKey);
      
		console.log(token)
		res.status(200).send({ data: token, message: "logged in successfully",user:user });
	} catch (error) {
		res.status(500).send({ message: "Internal Server error" });
	}

});





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


// ==========================

const uploadimg = multer({ storage: storage });
router.post( "/register/signupusers",
  uploadimg.single("image"),
  async (req, res) => {
    const file = req.image;
   
    try {
     
      const usere = await adminusers.findOne({ email: req.body.email });
      const user = await adminusers.findOne({ number: req.body.number });
        
      if (usere===null&&user===null){
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const registerabout = new adminusers({
          name: req.body.name,
          lastname: req.body.lastname,
          email: req.body.email,
          number: req.body.number,
          password: newPassword,
          image: req.file.filename,
        });
  
        await registerabout.save();
        res.status(201).json(registerabout);
        
        console.log("Your record save successfully");
      }
       else{
        if(user){
          console.log("phone number already exist")
 
        return res.status(401).send({ message: "Phone number already exsit!" });
        }

        if(usere){
          console.log("email already exist")
        
        return res.status(401).send({ message: "Email already exsit!" });
        }
      
        
      }
      }
      catch (error) {
        res.status(500).send({ message: "Internal Server error" });
      }
      

  }
);

// ================================================================
// ========================Update admin user profile=======================
router.post( "/update/adminprofile",uploadimg.single("image"),async (req, res) => {
 
  try {
    if(req.file){
      const userdatails={
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        number:req.body.number,
        department:req.body.department,
        position:req.body.position,
        image:req.file.filename

      } 
const update=await adminusers.findByIdAndUpdate(req.body.id, userdatails, {
new: true,
});
    }else{
      const usere = await adminusers.findOne({ email: req.body.email });
      const user = await adminusers.findOne({ number: req.body.number });
        
      const userdatails={
        name:req.body.name,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password,
        number:req.body.number,
        image:req.body.imageurl

      } 

const update=await adminusers.findByIdAndUpdate(req.body.id, userdatails, {
new: true,
});
        
    }



  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
);
/*==========================it get specific user =============================*/
router.get("/login/usersdata/:id", async (req, res) => {

  try {  
    const { id } = req.params;
    
    const userss = await adminusers.findById({ _id: id });

    res.status(201).json(userss);
  } catch (error) {
    res.status(422).json(error);
    console.log("This catch part work here");
  }
});
// ======================================================================
module.exports = router;
