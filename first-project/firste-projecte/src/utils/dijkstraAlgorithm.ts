import type {GridNode} from "@/interfaces/node";
import {getAllNodes, getNeighbors, sortNodesByDistance} from "@/utils/algorithmFunction";
import {ToastMessage} from "@/state-management/ToastMessage";


export function dijkstra(grid: [GridNode[]], startNode: GridNode, finishNode: GridNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        if (closestNode !== undefined) {
            if (closestNode.isWall) {
                continue
            }
            if (closestNode.distance === Infinity) {
                ToastMessage.toast = {
                    severity: 'error',
                    summary: 'Can\'t Reach Finish!',
                    detail: 'Please Remove Walls That Blocking To Reach Finish',
                    life: 8000
                }
                return []
            }
            closestNode.isVisited = true;
            visitedNodesInOrder.push(closestNode);
            if (closestNode === finishNode) {
                return visitedNodesInOrder
            }

            updateUnvisitedNeighbors(closestNode, grid);
        }
    }
}


function updateUnvisitedNeighbors(node: GridNode, grid: [GridNode[]]) {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

