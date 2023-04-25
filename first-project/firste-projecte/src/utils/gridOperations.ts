import type {GridNode} from "@/interfaces/node";
import {GridNodes} from "@/state-management/GridNodes";
import {AlgorithmsEnum, getAllNodes, getNodesInShortestPathOrder} from "@/utils/algorithmFunction";
import {astar} from "@/utils/aStarAlgorithm";
import {dijkstra} from "@/utils/dijkstraAlgorithm";
import {ToastMessage} from "@/state-management/ToastMessage";

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
        ToastMessage.toast = {
            severity: 'error',
            summary: 'Can\'t Find Start or End!',
            detail: 'Please Select Start and End',
            life: 8000
        }
    }
}

function getCorrectAlgorithm(selectedAlgorithm: AlgorithmsEnum) {
    if (selectedAlgorithm === AlgorithmsEnum.Astar) {
        return astar(GridNodes.grid, GridNodes.selectedStart!, GridNodes.selectedEnd!)
    } else {
        return dijkstra(GridNodes.grid, GridNodes.selectedStart!, GridNodes.selectedEnd!)
    }
}

function getCorrectClass(node: GridNode) {
    if (node.isStart) {
        return 'start-node'
    } else if (node.isFinish) {
        return 'end-node'
    } else if (node.isWall) {
        return 'wall-node'
    }
    return ''
}

function resetAllClasses() {
    const allNodes = getAllNodes(GridNodes.grid)

    allNodes.forEach(value => {
        const nodeDOM = document.getElementById(`node-${value.row}-${value.col}`);
        if (nodeDOM) {
            nodeDOM.className =
                `node ${getCorrectClass(value)}`;
        }
    })
}

export function setNodes(resetStartFinish: boolean, gridChanged: boolean, gridColumns: number, gridRows: number) {
    if (gridChanged) {
        GridNodes.grid = getInitialGrid(gridColumns, gridRows)
    } else {
        GridNodes.grid = getInitialGrid(gridColumns, gridRows)

        if (GridNodes.selectedStart !== undefined) {
            const newStart = GridNodes.grid[GridNodes.selectedStart.row][GridNodes.selectedStart.col];
            newStart.isStart = true;
            GridNodes.setSelectedNode(newStart, true);
        }

        if (GridNodes.selectedEnd !== undefined) {
            const newEnd = GridNodes.grid[GridNodes.selectedEnd!.row][GridNodes.selectedEnd!.col];
            newEnd.isFinish = true;
            GridNodes.setSelectedNode(newEnd, false);
        }

        GridNodes.walls.forEach(wallNode => {
            GridNodes.grid[wallNode.row][wallNode.col].isWall = true
        })
    }
    if (resetStartFinish) {
        GridNodes.setSelectedNode(undefined, false);
        GridNodes.setWalls([]);
        GridNodes.setSelectedNode(undefined, true);
    }
    resetAllClasses()
}
