// Import the mongoose library
const mongoose = require("mongoose");

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Full name of the user, required field
    fullName: {
      type: String,
      required: true,
    },
    // Phone number of the user, required and must be unique
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    // Password of the user, required field
    password: {
      type: String,
      required: true,
    },
  },
  // Automatically add createdAt and updatedAt timestamps
  { timestamps: true }
);

// Export the User model based on the userSchema
module.exports = mongoose.model("User", userSchema);