'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputData = '';
process.stdin.on('data', chunk => inputData += chunk);
process.stdin.on('end', () => {
    inputData = inputData.trim().split(/\s+/);
    let pos = 0;

    const read = () => inputData[pos++];

    // -------- INPUT --------
    const howGenes = parseInt(read());
    const genes = [];
    for (let i = 0; i < howGenes; i++) genes.push(read());

    const healths = [];
    for (let i = 0; i < howGenes; i++) healths.push(parseInt(read()));

    const howStrands = parseInt(read());

    // -------- BUILD gMap AND subs --------
    const gMap = {}; 
    const subs = new Set();

    for (let id = 0; id < howGenes; id++) {
        const gene = genes[id];

        if (!gMap[gene]) gMap[gene] = { ids: [], prefix: [0] };
        gMap[gene].ids.push(id);

        // add valid prefixes of gene
        const limit = Math.min(gene.length, 500);
        for (let j = 1; j <= limit; j++) subs.add(gene.slice(0, j));
    }

    // build prefix sums
    for (const gene in gMap) {
        const rec = gMap[gene];
        const ids = rec.ids;
        const prefix = rec.prefix;
        for (let i = 0; i < ids.length; i++) {
            prefix.push(prefix[i] + healths[ids[i]]);
        }
    }

    // largest gene length
    let largest = 0;
    for (let g of genes) largest = Math.max(largest, g.length);

    // -------- BISECTION FUNCTIONS --------
    function bisect_left(arr, x) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    function bisect_right(arr, x) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] <= x) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    // -------- CALCULATE HEALTH --------
    function getHealth(seq, first, last) {
        let total = 0;
        const ls = seq.length;

        for (let f = 0; f < ls; f++) {
            for (let j = 1; j <= largest; j++) {
                if (f + j > ls) break;

                const sub = seq.slice(f, f + j);

                if (!subs.has(sub)) break; // prune

                if (!gMap[sub]) continue;

                const ids = gMap[sub].ids;
                const prefix = gMap[sub].prefix;

                const r = bisect_right(ids, last);
                const l = bisect_left(ids, first);

                total += prefix[r] - prefix[l];
            }
        }
        return total;
    }

    // -------- PROCESS STRANDS --------
    let hMin = Infinity;
    let hMax = 0;

    for (let i = 0; i < howStrands; i++) {
        const first = parseInt(read());
        const last = parseInt(read());
        const strand = read();

        const h = getHealth(strand, first, last);
        if (h < hMin) hMin = h;
        if (h > hMax) hMax = h;
    }

    console.log(hMin + " " + hMax);
});
