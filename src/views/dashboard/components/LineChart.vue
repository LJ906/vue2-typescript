<template>
  <div class="line-chart">
    <base-chart :option="options"></base-chart>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import BaseChart from '@/components/Chart/index.vue'
export interface ILineChartData {
  expectedData: number[]
  actualData: number[]
}

@Component({
  components: { BaseChart }
})
export default class LineChart extends Vue {
  @Prop({ required: true }) private chartData!: ILineChartData
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: '100%' }) private width!: string
  @Prop({ default: '350px' }) private height!: string
  options = {}

  // mounted(): void {
  //   this.setOption(this.chartData)
  // }

  @Watch('chartData', { immediate: true })
  onChartDataChange(v: ILineChartData): void {
    this.setOption(v)
  }

  setOption(chartData: ILineChartData): void {
    this.options = {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#008acd'
          }
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: 8
      },
      yAxis: {
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: '#008acd'
          }
        }
      },
      legend: {
        data: ['expected', 'actual']
      },
      series: [
        {
          name: 'expected',
          itemStyle: {
            color: 'red',
            lineStyle: {
              color: 'red',
              width: 2
            }
          },
          smooth: true,
          type: 'line',
          data: chartData.expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2
            },
            areaStyle: {
              color: '#f3f8ff'
            }
          },
          data: chartData.actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }
      ]
    }
  }
}
</script>
<style scoped>
.line-chart {
  width: 100%;
  height: 360px;
  padding: 16px;
  margin-bottom: 32px;
  background-color: #fff;
}
</style>
