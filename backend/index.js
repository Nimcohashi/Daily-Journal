require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const getLocalIP = require("./config/util");
const port = process.env.PORT || 80;

// import routes
const testRoute = require("./routes/testRoute");
const userRoute = require("./routes/userRoute");
const notesRoute = require("./routes/notesRoute");  

app.use(express.json());

app.use(cookieParser());

// log requests
app.use((req, res, next) => {
  console.log(req.originalUrl);
  next();
});

// Define Routes
app.use("/test", testRoute);
app.use("/user", userRoute);
app.use("/notes", notesRoute);

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    const host = getLocalIP();
    app.listen(process.env.PORT, () => {
      console.log(
        "connected to Mongo DB & listening to requests on ",
        `http://${host}:${port}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
