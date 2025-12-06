function reverseShuffleMerge(s) {
    const n = s.length;
    const MAX_SIZE = 26;
    const aCount = new Array(MAX_SIZE).fill(0);       // count in answer
    const remaining = new Array(MAX_SIZE).fill(0);    // remaining count in s
    const required = new Array(MAX_SIZE).fill(0);     // required count for answer

    // Count frequency of each character
    for (let i = 0; i < n; i++) {
        remaining[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }

    // Required count for answer is half of total
    for (let i = 0; i < MAX_SIZE; i++) {
        required[i] = Math.floor(remaining[i] / 2);
    }

    const stack = [];

    // Process string in reverse
    for (let i = n - 1; i >= 0; i--) {
        const c = s[i];
        const idx = c.charCodeAt(0) - 'a'.charCodeAt(0);

        // Decrease remaining count
        remaining[idx]--;

        // Skip if we already have enough of this character in answer
        if (aCount[idx] >= required[idx]) continue;

        // Pop larger characters from stack if we can still pick them later
        while (stack.length > 0) {
            const top = stack[stack.length - 1];
            const topIdx = top.charCodeAt(0) - 'a'.charCodeAt(0);

            if (top > c && aCount[topIdx] + remaining[topIdx] > required[topIdx]) {
                stack.pop();
                aCount[topIdx]--;
            } else {
                break;
            }
        }

        stack.push(c);
        aCount[idx]++;
    }

    return stack.join('');
}