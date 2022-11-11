const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const connection_string = process.env.USER_URI;

const users = require("./routes/users_route")
// Configure Middlewear
app.use(cors());
app.use(express.json());
// Use /api/users as the address for sending user requests
app.use("/api/users", users);

// Api Header Page, for debugging
app.get("/", (req, res) => {
  res.send("Welcome to our user api...")
});

// Checks to ensure port is not in use,
// and prints port that server is running on.
app.listen(port, () => {
  console.log("Server running on port " + port);
});

// Mongoose connects to MongoDB database
// If connection fails, error message will be issued.
mongoose.connect(connection_string)
.then(() => console.log("MongDB connection established..."))
.catch((error) => console.error("MongoDB Connection Failed", error.message));
