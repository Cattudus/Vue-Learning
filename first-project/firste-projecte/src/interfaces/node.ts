export interface GridNode {
    col: number,
    row: number,
    isStart: boolean,
    isFinish: boolean,
    isVisited: boolean,
    distance: number,
    isWall: boolean,
    previousNode: GridNode | null,
    totalDistance: number,
    heuristic: number
}

export enum NodeOperation{
    setStartingNode,
    setFinishNode,
    setWall
}


