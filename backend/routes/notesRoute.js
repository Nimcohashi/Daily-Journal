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

// use routes
router.post("/create", createNote);
router.get("/", getNotes);
router.get("/:id", getSingularNote);
router.put("/update/:id", editNote);
router.delete("/delete/:id", deleteNote);


// export the router
module.exports = router;


