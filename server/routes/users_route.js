/**
 * @file Router handling user requests
 * @author Adam Sprain <ajsprain@gmail.com> and Wesley Burnawan <wburnawan@wisc.edu>
 * @version 2.2 12/13/2022 Wesley Burnawan added check for unique username in account creation
 *
 * @summary users_route creates multiple handlers for HTTP requests from client.
 * This allows for account creation, recall, editing, and deletion by HTTP request.
 */
const { User } = require("../models/user_model");
const express = require("express");

// This router will return all users in database
const user_router = express.Router();

/**
 * This handler handles get requests to "/" and allows client to get all users in database (NOT RECOMMENDED)
 *
 * @param {file} req is the HTTP request from the front end, no JSON is required as this is getting all users
 * @param {file} res is the HTTP response that will be sent in response to client, can contain errors
 */
user_router.get("/", async (req, res) => {
    // Find all users and sort in reverse order
    const users = await User.find().sort({ _id: -1 })
    // Returns user object to requestee
    res.send(users)
})

/**
 * This handler handles all get requests to "/one_user" and allows client to get a user by its id from the database
 * @param req is the HTTP request that must contain an id field, must be fed a JSON of the following style:
   {
        _id: Number
   }
 * @param res is the HTTP response that will be sent to the client, will contain user and status code
 * @return the status of the request and the user if found
 * status code 200 - user has been found in database and has been sent as response
 * status code 404 - user has not been found in database
 */
user_router.get("/one_user", async (req, res) => {
    let conditions = req.body._id
    User.findById(conditions, (err, user) => {
        if(!user) {
            return res.status(404).end()
        }
        else {
            res.send(user)
            return res.status(200).end()
        }
    })

})

/** This hander handles user creation requests to the "/" address
 * @param {File} req is the HTTP request from the front end, must contain a JSON document, see user_model.js for schema
 * @param {File} res is the HTTP response that will be sent in response to client, will containt error on failure
 * status code 201 - successful account creation
 * status code 400 - username already exists
 * status code 500 - for any other error during process
*/
user_router.post("/", async (req, res) => {
    // Pull user information from request
    const { username, password, firstname, lastname, age, location, bio, gender, email, phonenumber } = req.body;

    User.findOne({username:username}, (err, user) => { // check whether username already exists in database
        if(user) {
            res.status(400).send("username already exists")
        }

        else {
            // Create user object from user information
            const user = new User({
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

            user.save(err=>{ // save the user in the database
                if(err) { // send an error message if an error occured
                    res.status(500).send(err)
                    console.log(err.message)
                }
                else { // send successful message if process is done
                    res.status(201).send("account creation successful")
                }
            })
        }
    })

})

/** This handler handles user login requests to the "/login" address
 * @param {File} req  is the HTTP request from the front end, must be fed a JSON document of the following style:
 {
    // Required:
    "username": String,
    "password": String,
 }
 * @param {File} res is the HTTP response that will be sent in response to client, will containt error on failure
 * status code 200 - successful login
 * status code 403 - wrong password input
 * status code 404 - username not found in database
*/
user_router.post("/login", async (req, res) => {
    // Pull user information from request
    const { username, password } = req.body;

    User.findOne({username: username}, (err, user) => { // check whether the provided username from frontend exists
        if(user) { // if an account is found in database
            if(password === user.password) { // check if password given from frontend match the password in database
                res.status(200).send("Login successful")
            } else {
                res.status(403).send("Wrong password")
            }
        } else {
            res.status(404).send("Username not found")
        }
    })
})


/** This handler handles user UPDATE requests
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
 * @param {File} res is the HTTP response that will be sent in response to client, will containt error on failure
 * status code 201 - successful update
 * status code 404 - unsuccessful update because account not found
*/
user_router.put("/:id", async (req, res) => {
    // Update user record by id
    let conditions = {_id: req.params.id}; // req.params.id is from :id in the api
    User.findByIdAndUpdate(conditions, req.body) // req.body is the body sent in json format from frontend
    .exec() // convert to full-fledged promise
    .then(doc => {
        if (!doc) { return res.status(404).end(); }
        return res.status(201).end();
    })
    .catch(err => next(err));
})

/** This handler handles user DELETE requests
 * @param {File} req: Must be fed a JSON document of the following style:
 {
    // Required:
    "_id" : String
 }
 * @param {File} res is the HTTP response that will be sent in response to client, will containt error on failure
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

// Exports router for client use
module.exports = user_router;
