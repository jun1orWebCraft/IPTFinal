'use strict';
const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    push(item) {
        this.heap.push(item);
        this._bubbleUp(this.heap.length - 1);
    }
    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._bubbleDown(0);
        return min;
    }
    size() {
        return this.heap.length;
    }
    _bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent][0] <= this.heap[index][0]) break;
            [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
            index = parent;
        }
    }
    _bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            let smallest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < length && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
            if (right < length && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
            if (smallest === index) break;
            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }
}

function shortestReach(n, edges) {
    const graph = Array.from({length: n + 1}, () => []);
    for (const [u, v, w] of edges) {
        graph[u].push([v, w]);
        graph[v].push([u, w]);
    }
    
    const INF = 1e15;
    const distances = new Array(n + 1).fill(INF);
    distances[1] = 0;
    
    const minHeap = new MinHeap();
    minHeap.push([0, 1]);
    
    while (minHeap.size() > 0) {
        const [dist, u] = minHeap.pop();
        if (dist > distances[u]) continue;
        
        for (const [v, weight] of graph[u]) {
            const newDist = dist + weight;
            if (newDist < distances[v]) {
                distances[v] = newDist;
                minHeap.push([newDist, v]);
            }
        }
    }
    
    const result = [];
    for (let i = 1; i <= n; i++) {
        result.push(distances[i] === INF ? -1 : distances[i]);
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const [n, m] = readLine().trim().split(' ').map(Number);
        const edges = [];
        for (let i = 0; i < m; i++) {
            edges.push(readLine().trim().split(' ').map(Number));
        }
        const result = shortestReach(n, edges);
        ws.write(result.join(' ') + '\n');
    }
    ws.end();
}