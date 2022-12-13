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
    "firstname": String,
    "lastname": String,
    "age": Number (int),
    "location": String,
    "bio" : String,
    "gender": String,
    "email": String,
    "phonenumber": String
 }
 * status code 500 - for any error during process
*/
user_router.post("/", async (req, res) => {
    // Pull user information from request
    const { username, password, firstname, lastname, age, location, bio, gender, email, phonenumber } = req.body;

    // Create user object from user information
    let user = new User({
        username, 
        password, 
        firstname, 
        lastname, 
        age, 
        location, 
        bio, 
        gender, 
        email,
        phonenumber
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

/** This router handle user login requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "username": String,
    "password": String,
 }
 * status code 200 - successful login
 * status code 403 - wrong password input
 * status code 404 - username not found in database
*/
user_router.post("/login", async (req, res) => {
    // Pull user information from request
    const { username, password } = req.body;

    User.findOne({username: username}, (err, user) => {
        if(user) {
            if(password === user.password) {
                res.status(200).send("Login successful")
            } else {
                res.status(403).send("Wrong password")
            }
        } else {
            res.status(404).send("Username not found")
        }
    }) 
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
    "location": String,
    "bio" : String,
    "gender": String,
    "email": String,
    "phonenumber": String
 }
 * status code 200 - successful update
 * status code 404 - unsuccessful update because account not found
*/
user_router.put("/:id", async (req, res) => {
    // Update user record by id
    let conditions = {_id: req.params.id}; // req.params.id is from :id in the api
    User.findByIdAndUpdate(conditions, req.body) // req.body is the body sent in json format from frontend
    .exec() // convert to full-fledged promise
    .then(doc => {
        if (!doc) { return res.status(404).end(); }
        return res.status(200).end();
    })
    .catch(err => next(err));
})

/** This router handle user DELETE requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "_id" : String
 }
 * status code 204 - successful deletion
 * status code 404 - unsuccessful deletion because account not found
*/
user_router.delete("/:id", async (req, res) => {
    // Delete user record by id
    User
    .findByIdAndRemove(req.params.id) // req.params.id is from :id in the api
    .exec()  // convert to full-fledged promise
    .then(doc => {
        if (!doc) {return res.status(404).end(); }
        return res.status(204).end();
    })
    .catch(err => next(err));
})

// Exports router for outside use
module.exports = user_router;
