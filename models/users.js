const { default: mongoose } = require("mongoose");
const mongooose = require("mongoose");
const adminusers = new mongooose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },
});

const adminusersSchema = new mongoose.model("adminusers", adminusers);

module.exports = adminusersSchema;
