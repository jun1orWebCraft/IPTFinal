'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', () => {
    inputString = inputString.trim().split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

const MOD = 1000000007;

function modPow(base, exp) {
    let result = 1n;
    let b = BigInt(base) % BigInt(MOD);
    let e = BigInt(exp);

    while (e > 0) {
        if (e & 1n) {
            result = (result * b) % BigInt(MOD);
        }
        b = (b * b) % BigInt(MOD);
        e >>= 1n;
    }
    return result;
}

function beadOrnaments(b) {
    const n = b.length;

    if (n === 1) {
        // For single group: a^(a-2) mod MOD
        const a = b[0];
        if (a === 1) return 1; // 1^(1-2) = 1^(-1) undefined, but answer is 1 tree
        return Number(modPow(a, a - 2));
    } else {
        // n > 1:
        // product of b_i^(b_i - 1)
        // times sum(b)^(n - 2)
        let res = 1n;
        let sum = 0;

        for (const x of b) {
            res = (res * modPow(x, x - 1)) % BigInt(MOD);
            sum += x;
        }

        res = (res * modPow(sum, n - 2)) % BigInt(MOD);
        return Number(res);
    }
}

function main() {
    const t = parseInt(readLine(), 10);

    for (let i = 0; i < t; i++) {
        const bCount = parseInt(readLine(), 10);
        const b = readLine().trim().split(/\s+/).map(Number);
        const result = beadOrnaments(b);
        console.log(result);
    }
}
