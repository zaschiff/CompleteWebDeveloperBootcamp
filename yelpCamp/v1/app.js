const express = require('express');
const app = express();
const bp = require('body-parser');

var campgrounds = [
    {name: "Salmon Creek", img: "https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill", img: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest", img:"https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"}
];

app.set("view engine","ejs");
app.use(bp.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.render("landing");
})

app.get("/campgrounds", function(req, res) {
    res. render("campgrounds", {campgrounds: campgrounds})
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

app.post("/campgrounds",function(req, res) {
    // get data from form and add to campgrounds array
    var newCampground = {name: req.body.name, img: req.body.img};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Yelpcamp server has started on " + process.env.PORT);
})