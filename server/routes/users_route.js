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
    "username": String,
    "password": String,
    // Optionals:
    "firstname": String,
    "lastname": String,
    "age": Number (int),
    "university": String,
    "bio" : String,
    "gender": String,
    "email": String,
    "phone": String
 }
*/
user_router.post("/", async (req, res) => {
    // Pull user information from request
    const { username, password, firstname, lastname, age, university, bio, gender, email, phone } = req.body;

    // Create user object from user information
    let user = new User({
        username, 
        password, 
        firstname, 
        lastname, 
        age, 
        university, 
        bio, 
        gender, 
        email,
        phone
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



/** This router handle user UPDATE requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "_id" : String,
    // Optionals:
    "firstname": String,
    "lastname": String,
    "age": Number (int),
    "university": String,
    "bio" : String,
    "gender": String,
    "email": String,
    "phone": String
 }
*/
user_router.put("/:id", async (req, res) => {
    // Update user record by id
    let conditions = {_id: req.params.id};
    User.findByIdAndUpdate(conditions, req.body)
    .exec()
    .then(doc => {
        if (!doc) { return res.status(404).end(); }
        return res.status(200).end();
    })
})

/** This router handle user DELETE requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "_id" : String
 }
*/
user_router.delete("/:id", async (req, res) => {
    // Delete user record by id
    User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(doc => {
        if (!doc) {return res.status(404).end(); }
        return res.status(204).end();
    })
    .catch(err => next(err));
})

// Exports router for outside use
module.exports = user_router;