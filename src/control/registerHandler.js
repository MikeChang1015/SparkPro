// src/control/registerHandler.js

const { register } = require("../boundary/registerViewer");

// below line for debug 
// console.log("registerController:", require("../boundary/registerController"));

const handleRegister = async (req, res) => {
	const result = await register(req.body);

	if (!result.success) 
	{
		return res.status(400).send(result.message);
	}
	
	res.send(result.message);
};

module.exports = { handleRegister };
