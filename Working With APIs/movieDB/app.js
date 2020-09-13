const apiKey = "&apikey=thewdb";
const { default: Axios } = require('axios');
const express = require('express');

const app = express();
app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var query = req.query.search;
    var url = 'http://www.omdbapi.com/?s='+ query + apiKey;
    Axios.get(url)
        .then(function(apiRes) {
            var data = apiRes.data;
            res.render("results", {data: data});
        })
        .catch(function(err) {
            console.log(err);
        })    
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("movieDB has started on " + process.env.PORT);
});