var Campground = require('../models/campgrounds'),
    Comment = require('../models/comments');
    
// all the middleware goes in here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    // is a user logged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                // does the user own the campground
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not redirect
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not redirect
        req.flash("error", "You need to be logged in do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // is a user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                // does the user own the comment
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    // if not redirect
                    req.error("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        });
    } else {
        //if not redirect
        req.flash("error", "You need to be logged in do that");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    // this sets up the capability to access the flash 
    // message on the next page
    // almost like add this to the flash for the next request
    // MUST COME BEFORE REDIRECT!!!!!!!
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};


module.exports = middlewareObj;