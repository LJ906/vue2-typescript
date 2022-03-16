<template>
  <base-chart :option="options" :id="id" height="300px"></base-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaseChart from '@/components/Chart/index.vue'
// import echarts from 'echarts'

const animationDuration = 3000

@Component({
  components: { BaseChart }
})
export default class LineChart extends Vue {
  @Prop({ default: 'bar-chart' }) private id!: string

  options = {}

  // 设置option
  setOption(): void {
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],

        animationDuration,
        itemStyle: {
          color: 'rgb(1, 191, 236)'
        }
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }]
    }
  }

  mounted(): void {
    this.setOption()
  }
}
</script>
