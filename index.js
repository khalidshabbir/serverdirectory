require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongooose = require("mongoose");
require("./db/conn");
const cors = require("cors");
const port = process.env.PORT || 8002;
const router = require("./routes/router");
const Categories = require("./routes/categoryroute");
const Testimonial = require("./routes/testimonial");
const Review = require("./routes/reviews");
const About = require("./routes/aboutus");

const compny=require('./routes/company')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads',express.static('uploads'));
app.use(express.json());
app.use(router);
app.use(Categories);
app.use(Testimonial);
app.use(Review);
app.use(About);

app.use(compny);

app.listen(port, () => {
    console.log(`Server start at port: ${port}`);
  });
  