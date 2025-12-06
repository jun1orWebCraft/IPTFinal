function morganAndString(a, b) {
    // Append a sentinel character '{' (ASCII after 'Z') to avoid index errors
    a += '{';
    b += '{';

    let i = 0, j = 0;
    let result = [];

    // Merge until both strings are fully consumed
    while (i < a.length - 1 || j < b.length - 1) {
        // Compare substrings starting from current positions
        if (a.slice(i) <= b.slice(j)) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }

    return result.join('');
}