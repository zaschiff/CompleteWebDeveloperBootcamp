const mongoose      = require('mongoose'),
      passportLM    = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLM);

module.exports = mongoose.model("User", UserSchema);