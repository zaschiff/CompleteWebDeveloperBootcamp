var express = require('express');
var app = express();


app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment")
});

app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof"
    }
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says '" + sounds[animal] + "'");
    
}); 

app.get("/repeat/:string/:number", function(req, res) {
    var msg = req.params.string;
    var num = req.params.number;
    res.send((msg + " ").repeat(num));
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running on port " + process.env.PORT);
});