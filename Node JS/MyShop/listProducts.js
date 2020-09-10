function printShopBoard() {
    console.log("=".repeat(25));
    console.log("=  WELCOME TO MY SHOP!  =");
    console.log("=".repeat(25));
    console.log();
}



var faker = require('faker');

printShopBoard();

for (i = 1; i <= 10; i++) {
    console.log(faker.commerce.productName() + " - $" + faker.commerce.price());
}