var mongoose = require('mongoose');
var passportLM = require('passport-local-mongoose');


var UserSchema = mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLM);

module.exports = mongoose.model("User", UserSchema);