// Require necessary dependencies
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const Note = require("../models/notes");
const jsonwebtoken = require("jsonwebtoken");

// Define the secret key to sign JWT tokens
const secret_key = "SWAROPpasd";

// Get all users
const users = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.json(allUsers);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Sign up a new user
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user with this email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user with hashed password
    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      username,
    });

    // Sign JWT token and send back to the client
    const token = jsonwebtoken.sign(
      { email: newUser.email, id: newUser._id },
      secret_key
    );
    res.status(200).json({ user: newUser, token: token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Sign in an existing user
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("got req", email, password);
    // Check if user with this email exists
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Doesn't Exists" });
    }

    // Compare the password entered by the user with the hashed password saved in the database
    const passwordCompare = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!passwordCompare) {
      return res.status(400).json({ message: "Password Doesn't Match Buddy" });
    }

    // Sign JWT token and send back to the client
    const token = jsonwebtoken.sign(
      { email: existingUser.email, id: existingUser._id },
      secret_key
    );
    res.status(200).json({ user: existingUser, token });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Export the controller methods
module.exports = { signin, signup, users };
