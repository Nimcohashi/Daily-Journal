const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
};

const register = async (req, res) => {
  const { fullName, phone, password } = req.body;

  if (!fullName || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check if the user already exists
    const user = await User.findOne({ phone });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = new User({
      fullName: fullName,
      phone: phone,
      password: hashedPassword,
    });

    await newUser.save();

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

const login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // check if the user exists
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

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

const fetchUser = async (req, res) => {
  try {
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
