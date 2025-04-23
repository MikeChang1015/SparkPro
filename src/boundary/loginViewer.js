// src/boundary/loginViewer.js

const User = require("../entity/User");	// import "User" entity from the domain layer

const login = async (username, password) => {
	
	// To use User entity to check if the user is existed
	const user = await User.findByUsername(username);
	if (!user) 
		return { success: false, message: "User not found" };

	// To use User entity to check if the password is valid
	const isValid = await user.isValidPassword(password);
	if (!isValid) 
		return { success: false, message: "Incorrect password" };

	return { success: true };	// login OK
};

module.exports = { login };
