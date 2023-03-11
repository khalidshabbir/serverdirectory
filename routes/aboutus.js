const express = require("express")
const router = express.Router()
const multer = require("multer")
const Aboutus = require("../models/aboutus")
//===============================================
// ====================== register new admin users============================
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '_' + file.originalname);
    },
});
const uploadimg = multer({ storage: storage });
// ======================================================
router.post("/register/aboutus",
    uploadimg.single("image"),
    async (req, res) => {
        const file = req.image;
        try {
           console.log("setctin")
           console.log(req.body)
            const listcompany = new Aboutus({
                heading: req.body.heading,
                section: req.body.section,
                description: req.body.description,
                img: req.file.filename
            });
            await listcompany.save();
            res.status(201).json(listcompany);
            console.log("Your record save successfully");

        } catch (error) {
            res.status(500).send({ message: "Internal Server error" });

        }
    }
);

// ============================================
router.get("/aboutus/getdata", async (req, res) => {
    try {
        const users = await Aboutus.find();
        res.status(201).json(users);

    } catch (error) {
        res.status(422).json(error);
        console.log("There is an error in get userdata");
    }
});
// =======================================================================
router.delete("/aboutus/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await Aboutus.findByIdAndDelete({ _id: id });
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
});
// ==========================================================
router.post("/update/aboutus", uploadimg.single("image"), async (req, res) => {

    try {
        
        if (req.file) {
            console.log("here is file")
            const userdatails = {
                heading: req.body.heading,
                section: req.body.section,
                description: req.body.description,
                img: req.file.filename

            }
            const update = await Aboutus.findByIdAndUpdate(req.body.id, userdatails, {
                new: true,
            });
        } else {
          console.log(req.body)
            const userdatails = {
                heading: req.body.heading,
                section: req.body.section,
                description: req.body.description,
                img: req.body.imageurl

            }

            const update = await Aboutus.findByIdAndUpdate(req.body.id, userdatails, {
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