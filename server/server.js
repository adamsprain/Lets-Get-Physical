const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users_route")

require("dotenv").config({ path: "./config.env" });
// Process.env.PORT is an environment variable tha can be set in config.env.\
// If not set, port defaults to 5000
const port = process.env.PORT || 5000;
// USER_URI can be found in config.env
const connection_string = process.env.USER_URI;
const app = express();

// Allows Cross-Origin Resource Sharing, restricting who can
// access specific resources at this domain
app.use(cors());

// Configures express to only parse JSON and will only look at
// requests where the Content-Type header matches the type option.
app.use(express.json());

// Use /api/users as the address for sending user requests
app.use("/api/users", users);

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
