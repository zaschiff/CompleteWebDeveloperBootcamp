const passport = require('passport'),
      express  = require('express'),
      router   = express.Router();

// LOAD MODELS
var middleware = require('../middleware'),
    User = require('../models/user');

// INITIAL LANDING ROUTE
router.get("/", function(req, res) {
    res.render("landing");
});

/******************************************************************************/
/******************************************************************************/

/******************************************************************************/
/********************************* AUTH ROUTES ********************************/
// REGISTER
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// LOGIN
router.get("/login", function(req, res) {
    res.render("login");
});

router.post(
    "/login", 
    passport.authenticate(
        "local", 
        {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        }
    )
);

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
})
/******************************************************************************/
/******************************************************************************/

module.exports = router;