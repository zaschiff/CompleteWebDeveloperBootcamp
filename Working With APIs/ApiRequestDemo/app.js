const axios = require('axios');

axios.get('https://jsonplaceholder.typicode.com/todos/10')
    .then(function(res) {
        console.log(res.data);
    })
    .catch(function(err) {
        console.log("Something went wrong!");
        console.log(err);
    });