const { User } = require("../models/user_model");
const express = require("express");

// This router will return all users in database
const user_router = express.Router();
user_router.get("/", async (req, res) => {
    // Find all users and sort in reverse order
    const users = await User.find().sort({ unique_user_id: -1 })
    // Returns user object to requestee
    res.send(users)
})

/** This router handle user POST requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "unique_user_id" : String,
    "username": String,
    "password": String,
    // Optionals:
    "name": String,
    "age": Number (int),
    "bio" : String
 }
*/
user_router.post("/", async (req, res) => {
    // Pull user information from request
    const { unique_user_id, username, password, name, age, bio } = req.body;

    // Create user object from user information
    let user = new User({
        unique_user_id,
        username,
        password,
        name,
        age,
        bio
    });

    try{
        // Create user document, once complete send to database
        user = await user.save();
        res.send(user);
    } catch (error) { // If unsuccessful, and error will be thrown
        // 500 = server error occured, send client error
        res.status(500).send(error.message);
        // Log error for debugging
        console.log(error.message);
    }
})

// Exports router for outside use
module.exports = user_router;