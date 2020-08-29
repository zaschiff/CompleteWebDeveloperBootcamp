function arrayMax(arr) {
    var max = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }

    console.log(max);
}

arrayMax([1,2,3]);
arrayMax([10,3,10,4]);
arrayMax([-5,100]);
