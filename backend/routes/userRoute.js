const express = require("express");

const { register, login, fetchUser } = require("../controllers/userController");

// Import the middleware
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


router.post("/register", register);
router.post("/login", login);

// Auth Middleware
router.use(requireAuth);
router.get("/fetch-user", fetchUser);


module.exports = router;
