const express = require('express'),
      router  = express.Router();


// LOAD MODEL
var Campground = require('../models/campgrounds');
/******************************************************************************/
/****************************** CAMPGROUND ROUTES *****************************/
//INDEX route - Shows all campgrounds
router.get("/", function(req, res) {
    // get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err);
        } else {
            // render the capgrounds to the page from the DB
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

// NEW route - show form to create new object.
router.get("/new", isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

// SHOW route - shows one object in teh DB
router.get("/:id", function(req, res) {
    // find the campground with the provided id
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) { 
        if (err) {
            console.log(err);
        } else {
            // console.log(foundCampground);
            // render the show template with the requested id
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// CREATE route - this route adds the new object from the form into the DB
router.post("/",function(req, res) {
    // get data from form and add to campgrounds array
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {
        name: req.body.name, 
        image: req.body.img, 
        desc: req.body.desc,
        author: author
    };

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
/******************************************************************************/
/******************************************************************************/

/******************************************************************************/
/***************************** CUSTOM FUNCTIONS *******************************/

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

/******************************************************************************/
/******************************************************************************/

// EXPORTING ROUTES
module.exports = router;