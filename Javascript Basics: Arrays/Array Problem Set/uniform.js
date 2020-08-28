function isUniform(arr) {
    var uniform = true;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i+1] && (i+1) !== arr.length) {
            uniform = false;
        }
    }
    
    console.log(uniform);
}

isUniform([1,1,1,1]);
isUniform([2,1,1,1]);
isUniform(["a", "b", "p"]);
isUniform(["b", "b", "b"]);