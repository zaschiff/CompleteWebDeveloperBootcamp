var there = false;

while (!there) {
    var answer = (prompt("Are we there yet?")).toLowerCase();
    if (answer == "yes" ||  answer == "yeah" || answer.indexOf("yes") !== -1) {
        there = true;
        alert("YAY, we finally Made it!");
    }
}