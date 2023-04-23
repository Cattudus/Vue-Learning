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
        if (GridNodes.selectedEnd?.row && GridNodes.selectedEnd?.col) {
          newGrid[GridNodes.selectedEnd?.row][GridNodes.selectedEnd?.col].isFinish = false
        }
        newNode = {
          ...node,
          isFinish: !node.isFinish,
          isWall: false,
        };
        GridNodes.selectedEnd = newNode
        break
      case NodeOperation.setStartingNode:
        if (GridNodes.selectedStart?.row && GridNodes.selectedStart?.col) {
          newGrid[GridNodes.selectedStart.row][GridNodes.selectedStart?.col].isStart = false
        }
        newNode = {
          ...node,
          isStart: !node.isStart,
          isWall: false,
        };
        GridNodes.selectedStart = newNode
        break
      default:
        newNode = {
          ...node,
          isWall: !node.isWall,
        };
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
       @click.right="getOperationBasedOnClick(row, col, NodeOperation.setFinishNode)"
       @click.left.exact="getOperationBasedOnClick(row, col, NodeOperation.setStartingNode)">
  </div>

</template>

<style scoped>
.node {
  width: 25px;
  height: 25px;
  background-color: white;
  transition: 0.6s;
  border: 1px solid black;
}

.node:hover {
  background-color: #a7a5a5;
}

.start-node {
  background-color: green !important;
}

.end-node {
  background-color: red !important;
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
