const passportLM    = require('passport-local-mongoose'),
      localStrategy = require('passport-local'),
      User          = require('./models/users'),
      bp            = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      express       = require('express'),
      app = express();

mongoose.connect('mongodb://localhost:27017/authDemo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Connected to DB..."))
    .catch((err) => console.log(err.message));

app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: "Rusty is the best and cutest do in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(bp.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res) {

    res.render("secret");
})


//****************************** Register Routes *******************************
app.get("/register", function(req, res) {
    // show the sign up form
    res.render("register");
});

app.post("/register", function(req, res) {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),
        req.body.password,
        function(err, user) {
            if (err) {
                console.log(err);
                return res.render('register');
            } else {
                passport.authenticate("local")(req,res, function() {
                    res.render('secret');
                });
            }
        });    
});
//*******************************************************************************

//****************************** Login Routes ***********************************
app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", 
    // middleware
    passport.authenticate("local",
    {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }),
    function(req, res) {

});
//*******************************************************************************

//****************************** Logout Routes **********************************

app.get("/logout", function(req, res) {
    req.logout(); // this solitary line logs user out.
    res.redirect("/");
});

//*******************************************************************************
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server running on PORT: " + process.env.PORT);
});

//*********************** User Defined Functions ********************************
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next
    }
    res.redirect("/login");
};