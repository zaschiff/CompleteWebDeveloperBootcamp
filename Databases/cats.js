// **************** Set up the package *********************
// include the package mongoose
const mongoose = require('mongoose');


// **************** Coonecting to the DB *******************
//  Connecting/Creating the connection to the database.
// this will connect to the databse if it exists, 
// if not it creates it
mongoose.connect('mongodb://localhost:27017/cat_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err.message));


// **************** Creating the model *********************
// **************** for the object to  ********************* 
// **************** go into the collection *****************
// this creates the pattern for the object that will go 
// into the DB collection
var  catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

// The model for the pattern is saved to a variable to
// be able to modify the object in the db. This is equivalent
// to compiling the schema into a javascript object.
var Cat = mongoose.model("Cat", catSchema);


// **************** adding a new cat to the DB *************
// this does not save to the DB, it just create the object
// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// this saves to the DB
// george.save(function(err, cat) {
//     if(err) {
//         console.log("Something Went Wrong!");
//     } else {
//         console.log("We just saved a cat to the DB:");
//         console.log(cat);
//     }
// });

// this code is equivalent to new and create all at once
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat) {
    if(err) {
        console.log(err);
    } else {
        console.log(cat);
    }
});


// **************** retrieve all cats from *****************
// **************** the DB and console.log *****************
// **************** each one *******************************
Cat.find({}, function(err, cats) {
    if(err) {
        console.log("Oh No, Error!");
        console.log(err);
    } else {
        console.log("All the Cats.....");
        console.log(cats);
    }
});