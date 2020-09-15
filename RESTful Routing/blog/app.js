//**************** inlcude necessary packages *****************
      
      // gains the ability of express-sanitizer. this removes script tags 
      // from other places
const es       = require('express-sanitizer'),
      
      // gains the abiltiy to overide a method based on a string parameter
      mo       = require('method-override'),
      
      // parses the body for parameters and other information
      bp       = require('body-parser'),
      
      // sets up the connection to the mongoDB
      mongoose = require('mongoose'),
      
      // gains access to the express framework
      express  = require('express'),
      
      // creates the instance of the express framework
      app      = express();

//***************** application configuration *****************
app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bp.urlencoded({extended:true}));
app.use(mo("_method"));
app.use(es());

//*************** set up mongoose connection to *************** 
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log("Connected to DB blog..."))
    .catch((err) => console.log(err.message));


// ******** Set up the data model for the DB collection *******
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});
var Blog = mongoose.model("Blog", blogSchema);
// create a test value to place in the DB in order 
// to check the db connection and
// DB collection schema
// Blog.create(
//     {
//         title: "Test Blog",
//         image: "https://images.pexels.com/photos/351406/pexels-photo-351406.jpeg?auto=compress&cs=tinysrgb&h=350",
//         body: "Hello from the german shephard blog post"
//     },
//     function(err, blog) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Newly Created Blog Post:");
//             console.log(blog);
//         }
//     }
// );

//***************** RESTFUL Routes ****************************
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

//***************** INDEX ROUTE *******************************
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log("Error!");
        } else {
            res.render("index", {blogs: blogs});
        }
    });
});

//***************** NEW ROUTE *********************************
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

//***************** CREATE ROUTE ******************************
app.post("/blogs", function(req, res) {
    // sanitize body
    req.body.blog.body = req.sanitize(req.body.blog.body);

    // create blog
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render("new");
        } else {
            // then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

//***************** SHOW ROUTE ********************************
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});

//***************** EDIT ROUTE ********************************
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

//***************** UPDATE ROUTE/METHOD OVERRIDE **************
app.put("/blogs/:id", function(req, res) {
    // sanitize body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    
    // UPDATE
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//************************ DELETE ROUTE ***********************
app.delete("/blogs/:id", function(req, res) {
    // destoy blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/blogs");
        } else {
            //redirect somewhere
            res.redirect("/blogs");
        }
    });
});

//****** Turn app on and listning on the environment port *****
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is Running on " + process.env.PORT);
});