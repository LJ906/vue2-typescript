<template>
  <div class="dashboard-editor-container">
    <panel-group></panel-group>
    <el-row>
      <line-chart :chartData="lineChartData"></line-chart>
    </el-row>
    <el-row :gutter="32" class="pie-chart">
      <el-col :lg="8" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <pie-chart id="dashboard-pie1"></pie-chart>
        </div>
      </el-col>
      <el-col :lg="8" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <bar-chart id="dashboard-bar"></bar-chart>
        </div>
      </el-col>
      <el-col :lg="8" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <bountry-line id="dashboard-line"></bountry-line>
        </div>
      </el-col>
    </el-row>
    
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PanelGroup from './components/PanelGroup.vue'
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'
import BountryLine from './components/BountryLine.vue'
import BarChart from './components/BarChart.vue'
import DragableBox from '@/components/Dragable/dragable.vue'

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
    LineChart,
    PieChart,
    BountryLine,
    BarChart,
    DragableBox
  }
})
export default class ClassName extends Vue {
  lineChartData = lineChartData.newVisitis

  
}
</script>
<style scoped lang="scss">
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
