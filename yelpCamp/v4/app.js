/******************************************************************************/
/********************************* PACKAGE LOAD********************************/
const bp       = require('body-parser'),
      mongoose = require('mongoose'),
      express  = require('express'),
      seedDB   = require('./seed'),
      app      = express();


// MODEL LOADS
var Campground = require('./models/campgrounds');
var Comment = require('./models/comments');
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
seedDB();


// application configuration
app.set("view engine","ejs");
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

/******************************************************************************/
/******************************************************************************/



// INITIAL LANDING ROUTE
app.get("/", function(req, res) {
    res.render("landing");
})

/******************************************************************************/
/****************************** CAMPGROUND ROUTES *****************************/
//INDEX route - Shows all campgrounds
app.get("/campgrounds", function(req, res) {
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
app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
});

// SHOW route - shows one object in teh DB
app.get("/campgrounds/:id", function(req, res) {
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
/******************************************************************************/
/******************************************************************************/

/******************************************************************************/
/******************************** COMMENT ROUTES ******************************/

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: foundCampground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res) {
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

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The Yelpcamp server has started on " + process.env.PORT);
})