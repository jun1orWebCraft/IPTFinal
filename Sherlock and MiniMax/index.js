function sherlockAndMinimax(arr, p, q) {
    arr.sort((a, b) => a - b); // sort array
    let r = p;
    let res = check(arr, p);

    // helper function: minimum distance from t to any element in arr
    function check(arr, t) {
        let res = Number.MAX_SAFE_INTEGER;
        for (let i = 0; i < arr.length; i++) {
            res = Math.min(res, Math.abs(arr[i] - t));
        }
        return res;
    }

    // check midpoint candidates
    for (let i = 1; i < arr.length; i++) {
        let m = Math.floor((arr[i] + arr[i - 1]) / 2);

        if (p <= m && q >= m) {
            let temp = check(arr, m);
            if (res < temp) {
                res = temp;
                r = m;
            }
        }

        if (p <= m + 1 && q >= m + 1) {
            let temp = check(arr, m + 1);
            if (res < temp) {
                res = temp;
                r = m + 1;
            }
        }
    }

    // check upper bound
    if (res < check(arr, q)) r = q;

    return r;
}
