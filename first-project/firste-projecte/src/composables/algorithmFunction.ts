import type {GridNode} from "@/interfaces/node";

export function sortNodesByDistance(unvisitedNodes: GridNode[]) {
    unvisitedNodes.sort((nodeA: GridNode, nodeB: GridNode) => nodeA.distance - nodeB.distance);
}

export function getNeighbors(node: GridNode, grid: [GridNode[]]) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) {
        neighbors.push(grid[row - 1][col])
    }
    if (row < grid.length - 1) {
        neighbors.push(grid[row + 1][col]);
    }
    if (col > 0) {
        neighbors.push(grid[row][col - 1]);
    }
    if (col < grid[0].length - 1) {
        neighbors.push(grid[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
}

export function getAllNodes(grid: [GridNode[]]): GridNode[] {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

export function getNodesInShortestPathOrder(finishNode: GridNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode!;
    }
    return nodesInShortestPathOrder;
}

export enum AlgorithmsEnum{
    Astar,
    Dijkstra
}
