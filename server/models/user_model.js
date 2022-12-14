/**
 * @file is the schema for Users in MongoDB server
 * @author Adam Sprain <ajsprain@gmail.com> and Wesley Burnawan <wburnawan@wisc.edu>
 * @version 2.1 12/13/2022 Wesley Burnawan changed fields to fit new phone number formating
 *
 * @summary This schema is used to create users and validate logins to Lets Get Physical
 * page. It is used by mongoose to create JSON documents to submit to MongoDB for account creation
 * and recall.
 */
const mongoose = require("mongoose");

// Creates a template for components to create documents to
// submit to the mongoDB collection
const userSchema = new mongoose.Schema({
    // Required:
    username: { type: String, required: true},
    password: { type: String, required: true},
    firstname: { type: String, default: "FirstName"},
    lastname: { type: String, default: "LastName"},
    age: { type: Number, default: 18},
    location: {type: String, default: "UW Madison"},
    bio: { type: String, default: "This user does not have a bio"},
    gender: {type: String, default: "Not specified"},
    email: {type: String, default: "Not specified"},
    phonenumber: {type: Number}
});

// Creates wrapper for mongoose schema as a model
const User = mongoose.model("User", userSchema);
// Exports model for creating MongoDB documents for upload to database
exports.User = User;