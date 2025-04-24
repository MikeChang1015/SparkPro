// src/entity/Cleaner.js

const User = require("./User");
const pool = require("../db");

class Cleaner extends User 
{
	constructor (data) 
	{
		super(data); // Pass common fields to User
		this.experience = data.experience;
		this.payPerHour = data.payPerHour;
		this.services = data.services; // Expect array of strings
	}

  static async register (data) 
  {
	await pool.query(
		"INSERT INTO cleaners (username, experience, payPerHour, services) VALUES ($1, $2, $3, $4)",
		[data.username, data.experience, data.payPerHour, data.services.split(",")]
	);
  }
}

module.exports = Cleaner;
