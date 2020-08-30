var count1 = -10;

while (count1 < 20) {
    console.log(count1);
    count1++;
}

console.clear();

var count2 = 10;

while (count2 < 41) {
    if (count2 % 2 == 0) {
        console.log(count2);
    }
    count2++;
}

console.clear();

var count3 = 300;

while (count3 < 334) {
    if (count3 % 2 !== 0) {
        console.log(count3);
    }
    count3++;
}

console.clear();

var count4 = 5;

while (count4 < 51) {
    if ((count4 % 5 == 0) && (count4 % 3 == 0)) {
        console.log(count4)
    }
    count4++;
}