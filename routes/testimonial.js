const express = require("express")
const router = express.Router()
const multer = require("multer")
const Testi = require("../models/testimonial")
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
router.post("/register/testimonial",
    uploadimg.single("image"),
    async (req, res) => {
        const file = req.image;
        try {
            console.log(req.body)

            const listcompany = new Testi({
                name: req.body.name,
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
router.get("/testimonial/getdata", async (req, res) => {
    try {
        const users = await Testi.find();
        res.status(201).json(users);

    } catch (error) {
        res.status(422).json(error);
        console.log("There is an error in get userdata");
    }
});
// =======================================================================
router.delete("/testimonial/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletuser = await Testi.findByIdAndDelete({ _id: id });
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
});
// ==========================================================
router.post("/update/testimonials", uploadimg.single("image"), async (req, res) => {

    try {
        
        if (req.file) {
            console.log("here is file")
            const userdatails = {
                name: req.body.name,
                description: req.body.description,
                img: req.file.filename

            }
            const update = await Testi.findByIdAndUpdate(req.body.id, userdatails, {
                new: true,
            });
        } else {
          console.log(req.body)
            const userdatails = {
                name: req.body.name,
                description: req.body.description,
                img: req.body.imageurl

            }

            const update = await Testi.findByIdAndUpdate(req.body.id, userdatails, {
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