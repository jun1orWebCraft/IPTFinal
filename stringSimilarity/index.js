function stringSimilarity(s) {
    const n = s.length;
    const Z = Array(n).fill(0);
    let l = 0, r = 0;
    
    for (let i = 1; i < n; i++) {
        if (i <= r) {
            Z[i] = Math.min(r - i + 1, Z[i - l]);
        }
        while (i + Z[i] < n && s[Z[i]] === s[i + Z[i]]) {
            Z[i]++;
        }
        if (i + Z[i] - 1 > r) {
            l = i;
            r = i + Z[i] - 1;
        }
    }
    
    // Total similarity is sum of Z-array + the full string itself
    return Z.reduce((sum, val) => sum + val, n);
}
