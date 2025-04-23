const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Handle User Login
const { handleLogin } = require ("./control/loginHandler");
const { handleRegister } = require("./control/registerHandler");

const app = express();
const port = process.env.PORT || 5432;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));

// Serve static files (like index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "../public")));

// Serve index.html when visiting root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/login", handleLogin);
app.post("/submit", handleRegister);

app.listen(port, () => console.log(`Server is running on port ${port}`));
