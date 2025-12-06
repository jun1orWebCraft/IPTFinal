function longestIncreasingSubsequence(arr) {
    if (arr.length === 0) return 0;

    const M = new Array(arr.length).fill(-1);
    let L = 1;

    M[0] = arr[0];

    for (let i = 1; i < arr.length; i++) {
        const x = arr[i];

        // Binary search for the insertion point
        let lo = 0, hi = L - 1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (M[mid] < x) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }

        const newL = lo + 1;
        M[newL - 1] = x;

        if (newL > L) L = newL;
    }

    return L;
}
