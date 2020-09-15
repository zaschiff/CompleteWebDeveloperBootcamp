const { render } = require('ejs');

const express  = require('express'),
      app      = express(),
      bp       = require('body-parser'),
      mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB yelp_camp..."))
    .catch(err => console.log(err.message));

app.set("view engine","ejs");
app.use(bp.urlencoded({extended: true}));

// set up the schema
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

var Campground = mongoose.model("Campground", campgroundSchema)
// Campground.create(
//     {
//         name: "Granite Hill", 
//         image: "https://images.pexels.com/photos/1061640/pexels-photo-1061640.jpeg?auto=compress&cs=tinysrgb&h=350",
//         desc: "This is a huge granite hill, no bathrooms. No Water. Beautiful granite!"
//     },
//     function (err, campground) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created Campground");
//             console.log(campground);
//         }
//     }
// );


app.get("/", function(req, res) {
    res.render("landing");
})

//INDEX route - Shows all campgrounds
app.get("/campgrounds", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            // render the capgrounds to the page from the DB
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

// NEW route - show form to create new object.
app.get("/campgrounds/new", function(req, res) {
    res.render("new");
});

// SHOW route - shows one object in teh DB
app.get("/campgrounds/:id", function(req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id, function (err, foundCampground) { 
        if(err) {
            console.log(err);
        } else {
            // render the show template with the requested id
            res.render("show", {campground: foundCampground});
        }
    });
});

// CREATE route - this route adds the new object from the form into the DB
app.post("/campgrounds",function(req, res) {
    // get data from form and add to campgrounds array
    var newCampground = {name: req.body.name, image: req.body.img, desc: req.body.desc};

    //Create a new campground and save to the DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            // redirect back to th campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Yelpcamp server has started on " + process.env.PORT);
})