// src/entity/User.js

// Using Node.js require () to import modules
// for password hashing, bcrypt.hash () for hashing and 
// bcrypt.compare () for password verification
const bcrypt = require("bcrypt");	
const pool = require("../db");	// for DB connection

class User
{
	// A class construtor to construct instance
	constructor (username, hashedPassword, name, age, mobile, location, role)
	{
		this.username = username;
		this.hashedPassword = hashedPassword;
		this.name = name;
		this.age = age;
		this.mobile = mobile;
		this.location = location;
		this.role = role;
	}
	
	// Asynchronous function - A function that running in the background without blocking the main flow
	// A Promise is a built-in object that represents the eventual completion (or failure)
	// We are using async function for password verification
	async isValidPassword (password)
	{
		// --------------- Hashed Password -----------------------------------
		// return a Promise and Promise will run in the background and eventually return a boolean datatype
		return bcrypt.compare (password, this.hashedPassword);
		
		//console.log("Comparing:", password, this.hashedPassword); // test password
		// return password === this.hashedPassword;	// by-pass hashed password
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
static async register(data)
{
		// console.log("REGISTER DATA RECEIVED:", data); // for debug
		const { username, password, name, age, mobile, location, role } = data;
		// Password Hashing
		// The integer "10" in the statement indicates the cost factor - how intensive the hashing will be.
		// "await" will pause the execution until the hashing is completed.
		const hashed = await bcrypt.hash (password, 10);
	
		// "pool" is used for database connection to execute SQL statement
		// "await" will wait until the insert operation completed.
		await pool.query(
			"INSERT INTO users (username, pwd, name, age, mobile, location, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
			[username, hashed, name, age, mobile, location, role]
		);

		// Delegate role-specific logic
		if (role === "Cleaner") {
			const Cleaner = require("./Cleaner");
			await Cleaner.register(data);
		} else if (role === "HomeOwner") {
			const HomeOwner = require("./HomeOwner");
			await HomeOwner.register(data);
		}
		
		// return a new User object
		return new User (username, hashed, name, age, mobile, location, role);
	}	
}

module.exports = User;