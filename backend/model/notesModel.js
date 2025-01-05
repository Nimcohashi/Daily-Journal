const mongoose = require("mongoose");

// Define the schema for notes
const notesSchema = new mongoose.Schema(
  {
    // The title of the note, required field
    title: {
      type: String,
      required: true,
    },
    // The content of the note, required field
    content: {
      type: String,
      required: true,
    },
    // The ID of the user who created the note, required field
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  // Automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Export the Notes model based on the notesSchema
module.exports = mongoose.model("Notes", notesSchema);
