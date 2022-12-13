/**
 * @file is the schema for Users in MongoDB server
 * @author Adam Sprain, Wesley Burnawan
 * @version 2.0 Wesley Burnawan changed fields to fit new model for user info
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