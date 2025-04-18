const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5432;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// ✅ Correct route
app.post("/submit", async (req, res) => {
  const { username, pwd } = req.body; // match your form fields

  try {
    await pool.query(
      "INSERT INTO users (username, pwd) VALUES ($1, $2)",
      [username, pwd]
    );
    res.send("User added!");
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database error");
  }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
