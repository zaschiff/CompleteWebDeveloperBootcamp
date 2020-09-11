var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var friends = [
    "Tony",
    "Miranda",
    "Justin",
    "Pierre",
    "Lily"
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.post("/addfriend", function(req, res) {
    var newFriend = req.body.newFriend.charAt(0).toUpperCase() 
        + req.body.newFriend.slice(1).toLowerCase();
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server listening on " + process.env.PORT);
})