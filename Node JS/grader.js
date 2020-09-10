function average(nums) {
	var total = 0;
	for (i = 0; i < nums.length; i++) {
		total += nums[i];
	}
	
	return Math.round((total/nums.length));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores));

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2));
