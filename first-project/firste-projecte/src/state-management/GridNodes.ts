import { reactive } from 'vue'
import type {GridNode} from "@/interfaces/node";
export const GridNodes = reactive({
    grid: [[]] as [GridNode[]],
    selectedStart: undefined as GridNode | undefined,
    selectedEnd: undefined as GridNode | undefined,
    walls: [] as GridNode[]
})
