const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  const { name, phoneNumber, email, password, role } = req.body;
  try {
    if (!name || !phoneNumber || !email || !password || !role) {
      return res.status(400).json("all fields are required");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "invaild email format" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email already exist" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ message: "password must have 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newRegistration = new user({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
      role,
    });
    const savedData = await newRegistration.save();

    return res
      .status(201)
      .json({ message: "registration successful", data: savedData });
  } catch (error) {
    console.error("Error saving data", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "Invalid email format" });
    }

    // Password length check
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must have at least 8 characters" });
    }

    // Find user by email
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "You are not registered" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN || "1d",
      }
    );

    // Send response
    return res.status(200).json({
      message: "Login successful",
      userName: existingUser.name,
      id: existingUser._id,
      token,
      role: existingUser.role,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
