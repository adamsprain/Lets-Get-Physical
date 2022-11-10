const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const connection_string = process.env.ATLAS_URI
app.use(cors());
app.use(express.json());

// get driver connection
const dbo = require("./db/conn");

app.listen(port, () => {
  console.log("Server running on port " + port);
})

mongoose.connect(connection_string)
.then(() => console.log("MongDB connection established..."))
.catch((error) => console.error("MongoDB Connection Failed", error.message))
