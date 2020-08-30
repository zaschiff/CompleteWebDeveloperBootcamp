function arraySum (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    console.log(sum);
}


arraySum([1,2,3]);
arraySum([10,3,10,4]);
arraySum([-5,100]);