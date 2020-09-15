const mongoose = require('mongoose');
var Post = require('./models/post');
var User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/associationDemo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log("Connected to the DB..."))
        .catch((err) => console.log("err.message"));

// // Post model - title, content
// var postSchema = new mongoose.Schema({
//     title: String,
//     content: String
// })
// var Post = mongoose.model("Post", postSchema);


// USER model - email, name
// var userSchema = new mongoose.Schema({
//     email: String,
//     name: String,
//     posts: [
//         {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Post"
//         }
//     ]
// });
// var User = mongoose.model("User", userSchema);

// Referencing the Data
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

Post.create({
    title: "How to cook the best burger pt. 4",
    content: "red red red red"
}, function(err, post) {
    User.findOne({email:"bob@gmail.com"}, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            foundUser.posts.push(post);
            foundUser.save(function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log(data);
                }
            });
        }
    });
});



// find the user
// find all posts for the user

// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });