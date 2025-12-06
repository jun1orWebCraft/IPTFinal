function matrixRotation(matrix, r) {
    const m = matrix.length;
    const n = matrix[0].length;
    const layers = Math.min(m, n) / 2;

    for (let layer = 0; layer < layers; layer++) {
        let elements = [];

        for (let i = layer; i < n - layer; i++) elements.push(matrix[layer][i]); // top row
        for (let i = layer + 1; i < m - layer - 1; i++) elements.push(matrix[i][n - layer - 1]); // right col
        for (let i = n - layer - 1; i >= layer; i--) elements.push(matrix[m - layer - 1][i]); // bottom row
        for (let i = m - layer - 2; i > layer; i--) elements.push(matrix[i][layer]); // left col

        const len = elements.length;
        const rot = r % len;
        const rotated = elements.slice(rot).concat(elements.slice(0, rot));

        let idx = 0;
        for (let i = layer; i < n - layer; i++) matrix[layer][i] = rotated[idx++]; // top row
        for (let i = layer + 1; i < m - layer - 1; i++) matrix[i][n - layer - 1] = rotated[idx++]; // right col
        for (let i = n - layer - 1; i >= layer; i--) matrix[m - layer - 1][i] = rotated[idx++]; // bottom row
        for (let i = m - layer - 2; i > layer; i--) matrix[i][layer] = rotated[idx++]; // left col
    }

    for (let row of matrix) {
        console.log(row.join(" "));
    }
}
