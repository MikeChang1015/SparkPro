// src/entity/User.js

// Using Node.js require () to import modules
// for password hashing, bcrypt.hash () for hashing and 
// bcrypt.compare () for password verification
const bcrypt = require("bcrypt");	
const pool = require("../db");	// for DB connection

class User
{
	// A class construtor to construct instance
	constructor (username, hashedPassword)
	{
		this.username = username;
		this.hashedPassword = hashedPassword;
	}
	
	// Asynchronous function - A function that running in the background without blocking the main flow
	// A Promise is a built-in object that represents the eventual completion (or failure)
	// We are using async function for password verification
	async isValidPassword (password)
	{
		// --------------- Hashed Password -----------------------------------
		// return a Promise and Promise will run in the background and eventually return a boolean datatype
		// return bcrypt.compare (password, this.hashedPassword);
		console.log("Comparing:", password, this.hashedPassword);

		return password === this.hashedPassword;	// by-pass hashed password
	}
	
	// async function to check if the user exist in the database
	static async findByUsername(username) 
	{
		const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
		
		if (result.rows.length === 0) 
			return null;	// if the user does not exist
		
		const user = result.rows[0];
		return new User(user.username, user.pwd);
	}
	
	// async function to handle user registration
	static async register (username, plainPassword)
	{
		// Password Hashing
		// The integer "10" in the statement indicates the cost factor - how intensive the hashing will be.
		// "await" will pause the execution until the hashing is completed.
		const hashed = await bcrypt.hash (plainPassword, 10);
	
		// "pool" is used for database connection to execute SQL statement
		// "await" will wait until the insert operation completed.
		await pool.query ("INSERT INTO users (username, pwd) VALUES ($1, $2)", [username, hashed]);
		
		// return a new User object
		return new User (username, hashed);
	}	
}

module.exports = User;