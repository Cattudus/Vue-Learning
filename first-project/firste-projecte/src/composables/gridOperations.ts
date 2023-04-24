import type {GridNode} from "@/interfaces/node";
import {GridNodes} from "@/state-management/GridNodes";
import {AlgorithmsEnum, getAllNodes, getNodesInShortestPathOrder} from "@/composables/algorithmFunction";
import {astar} from "@/composables/aStarAlgorithm";
import {dijkstra} from "@/composables/dijkstraAlgorithm";
import {useToast} from "primevue/usetoast";
import {app} from "@/main";

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

function createNode(col: number, row: number): GridNode {
    return {
        col: col,
        row: row,
        isStart: false,
        isFinish: false,
        isVisited: false,
        distance: Infinity,
        isWall: false,
        previousNode: null,
        heuristic: 0,
        totalDistance: Infinity
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

function animatePath(visitedNodesInOrder: GridNode[], nodesInShortestPathOrder: GridNode[]) {
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

export function visualizeShortestPath(selectedAlgorithm: AlgorithmsEnum) {
    if (GridNodes.grid && GridNodes.selectedStart && GridNodes.selectedEnd) {
        animatePath(getCorrectAlgorithm(selectedAlgorithm) ?? [], getNodesInShortestPathOrder(GridNodes.selectedEnd))
    } else {
        app.config.globalProperties.$toast.add({
            severity: 'error',
            summary: 'Can\'t Find Start or End!',
            detail: 'Please Select Start and End',
            life: 8000
        })
    }
}

function getCorrectAlgorithm(selectedAlgorithm: AlgorithmsEnum) {
    if (selectedAlgorithm === AlgorithmsEnum.Astar) {
        return astar(GridNodes.grid, GridNodes.selectedStart!, GridNodes.selectedEnd!)
    } else {
        return dijkstra(GridNodes.grid, GridNodes.selectedStart!, GridNodes.selectedEnd!)
    }
}

export function resetAllClasses() {
    const allNodes = getAllNodes(GridNodes.grid)
    allNodes.forEach(value => {
        const nodeDOM = document.getElementById(`node-${value.row}-${value.col}`);
        if (nodeDOM && (nodeDOM.className.includes('start-node') || nodeDOM.className.includes('end-node'))) {
            nodeDOM.className =
                `${nodeDOM.className.includes('start-node') ? 'start-node' : 'end-node'} node`;
        } else if (nodeDOM) {
            nodeDOM.className =
                'node';
        }
    })
}
