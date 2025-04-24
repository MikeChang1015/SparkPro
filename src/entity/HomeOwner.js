// src/entity/HomeOwner.js

const User = require("./User");
const pool = require("../db");

class HomeOwner extends User 
{
	constructor (data) 
	{
		super(data);
		this.occupation = data.occupation;
		this.budget = data.budget;
	}

	static async register(data) 
	{
		console.log("HomeOwner.register received:", data);
		
		await pool.query(
			"INSERT INTO homeowners (username, occupation, budget) VALUES ($1, $2, $3)",
			[data.username, data.occupation, data.budget]
		);
	}
}

module.exports = HomeOwner;
