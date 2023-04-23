export interface GridNode {
    col: number,
    row: number,
    isStart: boolean,
    isFinish: boolean,
    isVisited: boolean,
    distance: number,
    isWall: boolean,
    previousNode: any
}

export enum NodeOperation{
    setStartingNode,
    setFinishNode,
    setWall
}


