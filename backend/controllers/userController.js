const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function to create a JWT token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

// Controller to handle user registration
const register = async (req, res) => {
  const { fullName, phone, password } = req.body;

  // Validate input fields
  if (!fullName || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const user = await User.findOne({ phone });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName: fullName,
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

    // Respond with the new user's details and token
    return res
      .status(201)
      .json({
        message: "User registered successfully",
        fullName: newUser.fullName,
        phone: newUser.phone,
        token: createToken(newUser._id),
        createdAt: newUser.createdAt,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to handle user login
const login = async (req, res) => {
  const { phone, password } = req.body;

  // Validate input fields
  if (!phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Respond with the user's details and token
    return res
      .status(200)
      .json({
        message: "User logged in successfully",
        fullName: user.fullName,
        phone: user.phone,
        token: createToken(user._id),
        createdAt: user.createdAt,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

// Controller to fetch the authenticated user's data
const fetchUser = async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user._id).select("-password");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
  fetchUser,
};
