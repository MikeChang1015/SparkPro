// src/boundary/registerViewer.js

const User = require("../entity/User");

async function register(username, password, confirmedPassword) {
  if (!username || !password || !confirmedPassword) {
    return { success: false, message: "All fields are required." };
  }

  if (password !== confirmedPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  try {
    await User.register(username, password);
    return { success: true, message: "Registration successful!" };
  } catch (err) {
    console.error("Registration error:", err);
    return { success: false, message: "Registration failed." };
  }
}

module.exports = { register };
