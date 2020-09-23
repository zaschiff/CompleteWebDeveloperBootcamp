const express = require('express'),
      router  = express.Router({mergeParams: true});

// LOAD MODELS
var Campground = require('../models/campgrounds'),
    Comment    = require('../models/comments');

/******************************************************************************/
/******************************** COMMENT ROUTES ******************************/

// COMMENT CREATE ROUTE - GET
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

//COMMENT CREATE ROUTe - POST
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

// COMMENT EDIT ROUTE - GET
router.get("/:comment_id/edit", checkCommentOwnership,function(req, res) {

    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campgroundID: req.params.id, comment: foundComment});            
        }
    });
});

// COMMENT UPDATE ROUTE/ EDIT ROUTE - PUT
router.put("/:comment_id", checkCommentOwnership,function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function( err, updateedComment) {
        if (err) {
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
});

// DELETE/DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership,function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
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

function checkCommentOwnership(req, res, next) {
    // is a user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                res.redirect("back");
            } else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not redirect
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not redirect
        res.redirect("back");
    }
}

/******************************************************************************/
/******************************************************************************/

module.exports = router;