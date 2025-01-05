// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express"); // Import express
const mongoose = require("mongoose"); // Import mongoose
const cookieParser = require("cookie-parser");
const getLocalIP = require("./config/util"); // Import getLocalIP function

// Create an express app
const app = express();

// Set the port and host
const port = process.env.PORT || 80;
const host = getLocalIP();

// Import routes
const testRoute = require("./routes/testRoute"); // Import testRoute
const userRoute = require("./routes/userRoute"); // Import userRoute
const notesRoute = require("./routes/notesRoute"); // Import notesRoute

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Request Endpoint: ${req.method} http://${host}:${port}${req.url}`);
  next();
});

// Define Routes
app.use("/test", testRoute);  // Use testRoute for requests to /test  
app.use("/user", userRoute); // Use userRoute for requests to /user
app.use("/notes", notesRoute); // Use notesRoute for requests to /notes

// Set mongoose to use strict query mode
mongoose.set("strictQuery", true);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(port, () => {
      console.log(
        "connected to Mongo DB & listening to requests on",
        `http://${host}:${port}` // Print the host and port
      );
    });
  })
  .catch((error) => {
    console.log(error); 
  });
