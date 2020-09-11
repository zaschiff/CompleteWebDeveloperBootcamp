var express = require('express');
var app = express();

// "/" => "Hi There!"
// following code is create the initial route.
// app.get() requires two parameters. One for 
// the route, the other a callback function. The
// callback function also needs two parameters.
//      req is an object that contains all the info 
//      inside the request made.
//
//      res is the information sent back for the requet.

app.get("/", function(req, res) {
    res.send("Hi there!");
});
// "/bye" => "Goodbye!"

app.get("/bye", function(req, res){
    res.send("Goodbye!!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res) {
    res.send("MEOW!");
});

// Using the colon to matach a pattern
// colon is not a wildcard, this will 
// look for /r/ followed by litteraly any word
// this inly matches a pattern not letters.
app.get("/r/:subredditName", function(req, res) {
    res.send("Welcome to a subreddit!");
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res) {
    res.send("Welcome to a comments page!");
});

// Wildcard route to catch anything else
app.get("*", function(req, res) {
    res.send("You are a star!");
});

// in order for the app to run, we need to use
// the app.listen() function
app.listen(3000, process.env.IP, function() {
    console.log("Server has started");
});