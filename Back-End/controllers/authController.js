const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  const { name, phoneNumber, email, password } = req.body;
  try {
    if (!name || !phoneNumber || !email || !password) {
      return res.status(400).json("all fields are required");
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "invaild email format" });
    }

    const existingUser = await user.find({ email });
    if (existingUser) {
      return res.status(409).json({ message: "email already exist" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ message: "password must have 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const newRegistration = new this.registration({
      name,
      phoneNumber,
      email,
      password: hashedPassword,
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
    if (!email || !password) {
      return res.status(404).json({ message: "all fields are required" });
    }

    if (!email.includes("@") || !email.includes(".")) {
      return res.status(422).json({ message: "invaild email format" });
    }

    if (password < 8) {
      return res
        .status(400)
        .json({ message: "password must have 8 characters" });
    }

    const existingUser = await user.find({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "you are not registered" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "password do not match" });
    }

    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.EXPIRES_IN,
      }
    );

    return res.status(201).json({
        message:"login successfully",
        userName:existingUser.name,
        id:existingUser.id,
        token,
        type:existingUser.type
    })

  } catch (error) {
     console.error("Error saving data", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
