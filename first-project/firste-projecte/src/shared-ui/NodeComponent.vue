<script setup lang="ts">
import {defineProps} from "vue";
import {GridNodes} from "@/state-management/GridNodes";
import {NodeOperation} from "@/interfaces/node";
import type {GridNode} from "@/interfaces/node";


defineProps({
  col: Number,
  isFinish: Boolean,
  isStart: Boolean,
  isWall: Boolean,
  row: Number,
})

function getOperationBasedOnClick(row: number | undefined, col: number | undefined, operation: NodeOperation) {
  if (row !== undefined && col !== undefined) {
    const newGrid = GridNodes.grid.slice();
    const node = newGrid[row][col];
    let newNode;
    switch (operation) {
      case NodeOperation.setFinishNode:
        if (GridNodes.selectedEnd?.row !== undefined && GridNodes.selectedEnd?.col !== undefined) {
          newGrid[GridNodes.selectedEnd?.row][GridNodes.selectedEnd?.col].isFinish = false
        }
        newNode = {
          ...node,
          isFinish: !node.isFinish,
          isWall: false,
        };
        GridNodes.setSelectedNode(newNode, false)
        break
      case NodeOperation.setStartingNode:
        if (GridNodes.selectedStart?.row !== undefined && GridNodes.selectedStart?.col !== undefined) {
          newGrid[GridNodes.selectedStart.row][GridNodes.selectedStart?.col].isStart = false
        }
        newNode = {
          ...node,
          isStart: !node.isStart,
          isWall: false,
        };
        GridNodes.setSelectedNode(newNode, true)
        break
      default:
        newNode = {
          ...node,
          isWall: !node.isWall,
        };

        if (node.isWall) {
          GridNodes.removeWall(node)
        } else {
          GridNodes.addToWalls(newNode)
        }
        break
    }

    newGrid[row][col] = newNode as GridNode;
    GridNodes.grid = newGrid as [GridNode[]];
  }
}

</script>

<template>
  <div :class="{'start-node': isStart, 'end-node': isFinish, 'wall-node': isWall}"
       class="node" :id="`node-${row}-${col}`"
       @click.left.ctrl.exact="getOperationBasedOnClick(row, col, NodeOperation.setWall)"
       @click.right.prevent="getOperationBasedOnClick(row, col, NodeOperation.setFinishNode)"
       @click.left.exact="getOperationBasedOnClick(row, col, NodeOperation.setStartingNode)">
  </div>

</template>

<style scoped>
.node {
  width: 25px;
  height: 25px;
  background-color: white;
  transition: 0.3s;
  border: 1px solid #6d6d6d;
  cursor: pointer;
}

.node:hover {
  background-color: #cacaca;
  transform: scale(1.2);
}

.start-node {
  background-color: #5df15d !important;
}

.end-node {
  background-color: #e51e1e !important;
}

.node-visited {
  background-color: purple;
}

.wall-node {
  background-color: gray !important;
}

.node-shortest-path {
  background-color: yellow;
}
</style>
