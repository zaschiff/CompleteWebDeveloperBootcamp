var movie = [
    {
        title: "Frozen",
        rating: "7.4 stars",
        watched: false
    },
    {
        title: "Fight Club",
        rating:"8.8 stars",
        watched: true
    },
    {
        title: "The Hitman's Bodyguard",
        rating: "6.9 stars",
        watched: false
    },
    {
        title: "Skyfall",
        rating: "7.7 stars",
        watched: true
    }
];

function databaseCheck(movie) {
    if (movie.watched) {
        return ("You have watched \"" + movie.title + "\" - " + movie.rating);
    } else {
        return ("You have not seen \"" + movie.title + "\" - " + movie.rating);

    }
}

movie.forEach(function(movie) {
    console.log(databaseCheck(movie));
});