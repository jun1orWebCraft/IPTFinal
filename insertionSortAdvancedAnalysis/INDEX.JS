function insertionSort(arr) {
    // Helper: merge sort with inversion counting
    function mergeSort(array) {
        if (array.length <= 1) return { sorted: array, count: 0 };

        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));

        const merged = [];
        let i = 0, j = 0, count = left.count + right.count;

        while (i < left.sorted.length && j < right.sorted.length) {
            if (left.sorted[i] <= right.sorted[j]) {
                merged.push(left.sorted[i++]);
            } else {
                merged.push(right.sorted[j++]);
                // Count inversions: remaining elements in left are greater
                count += left.sorted.length - i;
            }
        }

        // Add leftovers
        while (i < left.sorted.length) merged.push(left.sorted[i++]);
        while (j < right.sorted.length) merged.push(right.sorted[j++]);

        return { sorted: merged, count };
    }

    // Run merge sort and return inversion count
    return mergeSort(arr).count;
}
