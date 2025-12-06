function maximumSum(a, m) {
    // Prefix sums + ordered set approach
    // The idea: track prefix sums modulo m and use them to find max subarray sum
    
    let prefix = 0;
    let maxSum = 0;
    
    // We'll store prefix sums in a sorted array
    const prefixSums = [];
    
    for (let num of a) {
        prefix = (prefix + num) % m;
        maxSum = Math.max(maxSum, prefix);
        
        // Binary search: find the smallest prefix > current prefix
        let idx = lowerBound(prefixSums, prefix + 1);
        if (idx < prefixSums.length) {
            maxSum = Math.max(maxSum, (prefix - prefixSums[idx] + m) % m);
        }
        
        // Insert current prefix into sorted array
        insertSorted(prefixSums, prefix);
    }
    
    return maxSum;
}

// Helper: binary search for lower bound
function lowerBound(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Helper: insert into sorted array
function insertSorted(arr, value) {
    let idx = lowerBound(arr, value);
    arr.splice(idx, 0, value);
}
