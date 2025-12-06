Z-array: Z[i] is the length of the longest prefix of s starting at index i that matches the original string’s prefix.

Window [l, r]: Keeps track of the rightmost segment that matches the prefix, allowing reuse of previous computations.

Matching loop: Expands Z[i] while characters match.

Sum: Total similarity = sum of all Z[i] values plus n (the whole string matches itself).