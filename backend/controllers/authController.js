const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create token for auto-login after signup
    const token = jwt.sign({ id: user._id }, process.env.secret, { expiresIn: "5d" });

    res.status(201).json({
      message: "User Registered",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token  // Return token so user is automatically logged in
      }
    });
  } catch (err) {
    res.status(500).json({
      message: "Signup failed",
      error: err.message
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token= jwt.sign({id: existingUser._id
    }, process.env.secret, {expiresIn:"5d"});

    // Login successful
    res.status(200).json({
      message: "User logged in successfully",
      data: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        token
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};


module.exports = { Signup, Login };
