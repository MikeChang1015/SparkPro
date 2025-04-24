const User = require("../entity/User");

async function register(data) 
{
	// Optional validation
	if (!data.username || !data.password || !data.confirmedPassword) {
		return { success: false, message: "Username and passwords are required." };
	}

	if (data.password !== data.confirmedPassword) {
		return { success: false, message: "Passwords do not match." };
	}

	try {
		console.log("registerViewer passing full data:", data);  // debug
		await User.register(data);  // pass everything
		return { success: true, message: "Registration successful!" };
	} catch (err) {
		console.error("Registration error:", err);
		return { success: false, message: "Registration failed." };
	}
}

module.exports = { register };