/**
 * @file Router handling user requests
 * @author Adam Sprain, Wesley Burnawan
 * @version 2.0 Wesley Burnawan added put and delete requests
 *
 */

const { User } = require("../models/user_model");
const express = require("express");

// This router will be used to interface the front end with backend
const user_router = express.Router();

/**
 * This handler handles get requests to "/" and allows client to get all users in database (NOT RECOMMENDED)
 *
 * @param {file} req is the HTTP request from the front end, no JSON is required as this is getting all users
 * @param {file} res is the HTTP response that will be sent in response to client, can contain errors
 * @return res, will contain all user documents in id order lowest to highest
 */
user_router.get("/", async (req, res) => {
    // Find all users and sort in reverse order
    const users = await User.find().sort({ _id: -1 })
    // Returns user object to requestee
    res.send(users)
})

/** This router handles user POST requests
 * @param {File} req is the HTTP request from the front end, must contain a JSON document, see user_model.js for schema
 * @param {File} res is the HTTP is the HTTP response that will be sent in response to client, will containt error on failure
 * @error If post fails, will throw 500 error (unexpected error during request)
 * and error will be logged to console
 * @return res if there is an error, otherwise will complete without return
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