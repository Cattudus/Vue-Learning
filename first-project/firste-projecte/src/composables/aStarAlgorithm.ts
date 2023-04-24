import type {GridNode} from "@/interfaces/node";
import {getAllNodes, getNeighbors, sortNodesByDistance} from "@/composables/algorithmFunction";

export function astar(grid: [GridNode[]], startNode: GridNode, finishNode: GridNode) {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.totalDistance = 0;
    startNode.heuristic = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        let current = unvisitedNodes.shift();
        if (current?.isWall) {
            continue
        }
        if (current === finishNode){
            return visitedNodesInOrder as GridNode[];
        }
        visitedNodesInOrder.push(current);
        if(current !== undefined) {
            let neighbors = getNeighbors(current, grid)
            for (const neighbor of neighbors) {
                if(!visitedNodesInOrder.includes(neighbor)){
                    let possibleTotal = current.totalDistance +1;

                    if(!unvisitedNodes.includes(neighbor)){
                        unvisitedNodes.push(neighbor);
                    }else if(possibleTotal >= neighbor.totalDistance){
                        continue
                    }
                    neighbor.totalDistance = possibleTotal;
                    neighbor.heuristic = heuristic(neighbor, finishNode)
                    neighbor.distance = neighbor.totalDistance + neighbor.heuristic
                    neighbor.previousNode = current
                }
            }
        }
    }


}

function heuristic(node1: GridNode, node2: GridNode) {
    let d1 = Math.abs(node2.col - node1.col);
    let d2 = Math.abs(node2.row - node1.row);

    return d1 + d2;
}
