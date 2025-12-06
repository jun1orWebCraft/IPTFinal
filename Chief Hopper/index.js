function chiefHopper(arr) {
    let min = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        min = Math.ceil((min + arr[i]) / 2);
    }
    return min;
}