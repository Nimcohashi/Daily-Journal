const express = require("express");

// Import the controller
const {
  createNote,
  getNotes,
  getSingularNote,
  editNote,
  deleteNote,
} = require("../controllers/notesController");

// Import the middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Auth Middleware
router.use(requireAuth);

// Define routes
router.post("/create", createNote); // Route to create a new note
router.get("/", getNotes); // Route to get all notes
router.get("/:id", getSingularNote); // Route to get a single note by ID
router.put("/update/:id", editNote); // Route to update a note by ID
router.delete("/delete/:id", deleteNote); // Route to delete a note by ID

// Export the router
module.exports = router;


