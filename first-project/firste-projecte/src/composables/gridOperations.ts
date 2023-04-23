import type {GridNode} from "@/interfaces/node";
import {GridNodes} from "@/state-management/GridNodes";
import {dijkstra, getAllNodes, getNodesInShortestPathOrder} from "@/composables/algoirithms";

export function getInitialGrid(gridCol: number, gridRow: number) {
    const grid = [];
    for (let row = 0; row < gridRow; row++) {
        const currentRow: GridNode[] = [];
        for (let col = 0; col < gridCol; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }

    return grid as [GridNode[]];
}

function createNode(col: number, row: number) {
    return {
        col: col,
        row: row,
        isStart: false,
        isFinish: false,
        isVisited: false,
        distance: Infinity,
        isWall: false,
        previousNode: null,
    };
}


function animateShortestPath(nodesInShortestPathOrder: GridNode[]) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            const nodeDOM = document.getElementById(`node-${node.row}-${node.col}`)
            if (nodeDOM) {
                nodeDOM.className =
                    'node node-shortest-path';
            }
        }, 50 * i);
    }
}

function animateDijkstra(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
        if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 25 * i);
            return;
        }
        setTimeout(() => {
            const node = visitedNodesInOrder[i];
            const nodeDOM = document.getElementById(`node-${node.row}-${node.col}`);
            if (nodeDOM) {
                nodeDOM.className =
                    'node node-visited';
            }
        }, 25 * i);
    }
}

export function visualizeShortestPath() {
    if (GridNodes.grid && GridNodes.selectedStart && GridNodes.selectedEnd) {
        animateDijkstra(dijkstra(GridNodes.grid, GridNodes.selectedStart,GridNodes.selectedEnd) ?? [], getNodesInShortestPathOrder(GridNodes.selectedEnd))
    }
}

export function resetAllClasses(){
    const allNodes = getAllNodes(GridNodes.grid)
    allNodes.forEach(value => {
        const nodeDOM = document.getElementById(`node-${value.row}-${value.col}`);
        if (nodeDOM) {
            nodeDOM.className =
                'node';
        }
    })
}
