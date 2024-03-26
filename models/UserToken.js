const mongoose = require("mongoose");

const userTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 43200,
  },
});

module.exports = mongoose.model("UserToken", userTokenSchema);
