const express = require("express");

// import controllers
const { testController, greetMe } = require("../controllers/testController");

// Create a new router
const router = express.Router();

// Define Routes
router.get("/test", testController);
router.post("/greet", greetMe);


module.exports = router;