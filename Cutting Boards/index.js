'use strict';

function minimumCost(m, n, yCosts, xCosts) {
    const MOD = 1_000_000_007n; // BigInt for large numbers

    // Sort costs in descending order
    yCosts.sort((a, b) => b - a);
    xCosts.sort((a, b) => b - a);

    let hPieces = 1n; // vertical segments count
    let vPieces = 1n; // horizontal segments count
    let totalCost = 0n;

    let i = 0, j = 0;

    // Greedy: pick the largest cost cut available
    while (i < yCosts.length && j < xCosts.length) {
        if (yCosts[i] >= xCosts[j]) {
            totalCost = (totalCost + BigInt(yCosts[i]) * vPieces) % MOD;
            hPieces++;
            i++;
        } else {
            totalCost = (totalCost + BigInt(xCosts[j]) * hPieces) % MOD;
            vPieces++;
            j++;
        }
    }

    // Remaining horizontal cuts
    while (i < yCosts.length) {
        totalCost = (totalCost + BigInt(yCosts[i]) * vPieces) % MOD;
        hPieces++;
        i++;
    }

    // Remaining vertical cuts
    while (j < xCosts.length) {
        totalCost = (totalCost + BigInt(xCosts[j]) * hPieces) % MOD;
        vPieces++;
        j++;
    }

    return Number(totalCost);
}

// HackerRank input/output handler
function main() {
    const fs = require('fs');
    const input = fs.readFileSync(0, 'utf-8').trim().split(/\s+/).map(Number);

    let idx = 0;
    const q = input[idx++]; // number of test cases

    for (let t = 0; t < q; t++) {
        const m = input[idx++];
        const n = input[idx++];
        const yCosts = [];
        const xCosts = [];

        for (let i = 0; i < m - 1; i++) yCosts.push(input[idx++]);
        for (let i = 0; i < n - 1; i++) xCosts.push(input[idx++]);

        console.log(minimumCost(m, n, yCosts, xCosts));
    }
}

main();