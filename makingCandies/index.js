function minimumPasses(m, w, p, n) {
    // m = starting machines
    // w = starting workers
    // p = cost of buying a machine or worker
    // n = target candies

    let candies = 0;          // current candies
    let passes = 0;           // number of passes
    let minPasses = Infinity; // track minimum passes

    while (candies < n) {
        passes++;

        // Produce candies this pass
        candies += m * w;

        // Update minimum passes if we can reach target now
        minPasses = Math.min(minPasses, passes + Math.ceil((n - candies) / (m * w)));

        // If we already reached target, break
        if (candies >= n) break;

        // If we don't have enough to buy, fast-forward passes
        if (candies < p) {
            let extraPasses = Math.ceil((p - candies) / (m * w));
            passes += extraPasses;
            candies += extraPasses * m * w;
        }

        // Buy as many as possible
        let buys = Math.floor(candies / p);
        candies -= buys * p;

        // Balance machines and workers
        let total = m + w + buys;
        let half = Math.floor(total / 2);
        if (m > w) {
            m = Math.max(m, half);
            w = total - m;
        } else {
            w = Math.max(w, half);
            m = total - w;
        }
    }

    return Math.min(minPasses, passes);
}
