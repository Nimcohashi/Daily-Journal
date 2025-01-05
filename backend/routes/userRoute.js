const express = require("express");

const { register, login, fetchUser } = require("../controllers/userController");

// Import the middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// Route to register a new user
router.post("/register", register);

// Route to login a user
router.post("/login", login);

// Auth Middleware to protect the routes below
router.use(requireAuth);

// Route to fetch the authenticated user's data
router.get("/fetch-user", fetchUser);

module.exports = router;
