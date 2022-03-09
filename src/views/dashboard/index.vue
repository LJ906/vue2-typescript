<template>
  <div class="dashboard-editor-container">
    <panel-group></panel-group>
    <el-row>
      <line-chart :chartData="lineChartData"></line-chart>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
export interface ILineChartData {
  expectedData: number[]
  actualData: number[]
}

// 折线图数据
const lineChartData: { [type: string]: ILineChartData } = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

@Component({
  components: {
    PanelGroup,
    LineChart
  }
})
export default class ClassName extends Vue {
  // console.log();
  
  lineChartData = lineChartData.newVisitis
}
</script>
<style scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
