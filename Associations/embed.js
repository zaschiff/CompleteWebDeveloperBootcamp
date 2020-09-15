const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/associationDemo',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => console.log("Connected to the DB..."))
        .catch((err) => console.log("err.message"));

// Post model - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
})
var Post = mongoose.model("Post", postSchema);


// USER model - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// Creating first user object to work with inside collection (uncomment if needed)
// var newUser = new User({
//     email: "charlie@brown.edu",
//     name: "Charlie Brown"
// });
// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// Creating first post object to start with inside collection (uncomment if needed)
// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });
// newPost.save(function(err, post) {
//     if (err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });


// CREATING THE ASSOCIATION - uncommnet if needed!!!!
// var newUser = User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding. Go to potions class to learn it!"
// });

// newUser.save(function(err, user) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


// Potentiall creating call back hell
User.findOne({name: "Hermione Granger"}, function(err, user) {
    if (err){
        console.log(err);
    } else {
        user.posts.push({
            title: "3 Things I really hate",
            content: "Voldemort. Voldemort. Voldemort"
        });
        user.save(function(err, user) {
            if(err){
                console.log(err);
            } else {
                console.log(user);
            }
        });
    }
});