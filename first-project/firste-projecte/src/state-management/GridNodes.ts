import {reactive} from 'vue'
import type {GridNode} from "@/interfaces/node";

export const GridNodes = reactive({
    grid: [[]] as [GridNode[]],
    selectedStart: undefined as GridNode | undefined,
    selectedEnd: undefined as GridNode | undefined,
    walls: [] as GridNode[],
    removeWall(wall: GridNode) {
        this.walls.splice(this.walls.indexOf(wall), 1)
    },
    setSelectedNode(node: GridNode | undefined, isStart: boolean) {
        if (isStart) {
            this.selectedStart = node;
        } else {
            this.selectedEnd = node;
        }
    },
    setWalls(nodes: GridNode[]){
        this.walls = nodes
    },
    addToWalls(node: GridNode){
        this.walls.push(node)
    }
})
