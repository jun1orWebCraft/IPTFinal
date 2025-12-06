const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let inputLines = [];
rl.on('line', (line) => {
    inputLines.push(line.trim());
}).on('close', () => {
    main(inputLines);
});

function floyd(roadNodes, roadEdges, roadFrom, roadTo, roadWeight, x, y) {
    // Convert to 0-indexed
    roadFrom = roadFrom.map(i => i - 1);
    roadTo = roadTo.map(i => i - 1);
    x = x.map(i => i - 1);
    y = y.map(i => i - 1);

    const INF = 139651;

    // Initialize distance matrix
    const dist = Array.from({ length: roadNodes }, () => Array(roadNodes).fill(INF));
    const connectedTo = {};
    for (let i = 0; i < roadNodes; i++) {
        dist[i][i] = 0;
        connectedTo[i] = {};
    }

    for (let i = 0; i < roadEdges; i++) {
        const from = roadFrom[i];
        const to = roadTo[i];
        const w = roadWeight[i];
        dist[from][to] = w;
        connectedTo[from][to] = w;
    }

    // Floyd-Warshall iterative update
    for (let i = 0; i < roadNodes; i++) {
        for (let _ = 0; _ < roadNodes; _++) {
            let done = true;
            for (let k = 0; k < roadNodes; k++) {
                for (let j of Object.keys(connectedTo[k])) {
                    j = parseInt(j);
                    if (dist[i][j] > dist[i][k] + dist[k][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        done = false;
                    }
                }
            }
            if (done) break;
        }
    }

    return x.map((xi, idx) => dist[xi][y[idx]] < INF ? dist[xi][y[idx]] : -1);
}

function main(lines) {
    const [roadNodes, roadEdges] = lines[0].split(' ').map(Number);

    const roadFrom = [];
    const roadTo = [];
    const roadWeight = [];

    for (let i = 0; i < roadEdges; i++) {
        const [from, to, weight] = lines[1 + i].split(' ').map(Number);
        roadFrom.push(from);
        roadTo.push(to);
        roadWeight.push(weight);
    }

    const q = Number(lines[roadEdges + 1]);
    const x = [];
    const y = [];
    for (let i = 0; i < q; i++) {
        const [xi, yi] = lines[roadEdges + 2 + i].split(' ').map(Number);
        x.push(xi);
        y.push(yi);
    }

    const results = floyd(roadNodes, roadEdges, roadFrom, roadTo, roadWeight, x, y);
    console.log(results.join('\n'));
}
