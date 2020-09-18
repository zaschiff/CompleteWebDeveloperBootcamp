const express = require('express'),
      router  = express.Router({mergeParams: true});

// LOAD MODELS
var Campground = require('../models/campgrounds'),
    Comment    = require('../models/comments');

/******************************************************************************/
/******************************** COMMENT ROUTES ******************************/

router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

router.post("/", isLoggedIn, function(req, res) {
    // lookup the campground using the id
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment to campground
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    // add a username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment
                    campground.comments.push(comment);
                    campground.save();

                    // redirec to campground
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
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

module.exports = router;