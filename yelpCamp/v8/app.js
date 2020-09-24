/******************************************************************************/
/********************************* PACKAGE LOAD********************************/
const methodOverride = require('method-override'),
      localStrategy = require('passport-local'),
      flash         = require('connect-flash'),
      bp            = require('body-parser'),
      mongoose      = require('mongoose'),
      passport      = require('passport'),
      express       = require('express'),
      seedDB        = require('./seed'),
      app           = express();


// MODEL LOADS
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');
var User = require('./models/user');

// ROUTE LOADS
var campgroundRoutes = require('./routes/campgrounds'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes      = require('./routes/index');
/******************************************************************************/
/******************************************************************************/

/******************************************************************************/
/****************************** APP CONFIGURATION *****************************/
// set up the connection to the DB
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Connected to DB yelp_camp..."))
    .catch(err => console.log(err.message));

// reset the DB
//seedDB();

// application configuration
app.set("view engine","ejs");
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: "His name rymes with poleverine!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// SET THE ABILTIY FOR A USER TO LOGIN
// AND LET EACH PAGE SEE THEM.
// MUST BE AFTER APP CONFIG AND PASSPORT
// CONFIG
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// CONFIGURE APP TO USED THE ROUTES
// THIS MUST BE LAST!!!
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/", indexRoutes);

/******************************************************************************/
/******************************************************************************/


/******************************************************************************/
/****************************** TURN SERVER ON ********************************/

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Yelpcamp server has started on " + process.env.PORT);
})

/******************************************************************************/
/******************************************************************************/
