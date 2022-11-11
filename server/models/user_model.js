const mongoose = require("mongoose");

// Creates a template for components to create documents to
// submit to the mongoDB collection
const userSchema = new mongoose.Schema({
    unique_user_id: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
});

// Creates wrapper for mongoose schema as a model
const User = mongoose.model("User", userSchema);
// Exports model for creating MongoDB documents for upload to database
exports.User = User;