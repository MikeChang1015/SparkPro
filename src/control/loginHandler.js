// src/control/loginHandler.js

// The controller handles HTTP request / response concerns.
// It also delegate the actual authentication logic to the boundary
// And translate the boundary response into appriopriate HTTP 

const { login } = require("../boundary/loginViewer");	// To import the login function from boundary

// Handle HTTP request and response
const handleLogin = async (req, res) => {
	// Extract username and password from the request body
	const { username, password } = req.body;
	
	// Calls the login boundary function with the extracted credentials and wait for result
	const result = await login(username, password);

	// if login failed
	if (!result.success) 
	{
		return res.status(401).send(result.message); // Unauthorised login in HTTP
	}
	
	// if login success
	res.send("Login successful!");
};

module.exports = { handleLogin };
