<template>
  <base-chart :option="options" :id="id" height="300px"></base-chart>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import BaseChart from '@/components/Chart/index.vue'
// import echarts from 'echarts'

@Component({
  components: { BaseChart }
})
export default class LineChart extends Vue {
  @Prop({ default: 'bountryline-chart' }) private id!: string

  options = {}

  // 设置option
  setOption(): void {
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['Line 1', 'Line 2', 'Line 3'],
        bottom: '10px'
      },
      grid: {
        left: '3%',
        right: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: 'rgb(128, 255, 165)'
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(128, 255, 165)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(1, 191, 236)'
            //   }
            // ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //   {
            //     offset: 0,
            //     color: 'rgb(0, 221, 255)'
            //   },
            //   {
            //     offset: 1,
            //     color: 'rgb(77, 119, 255)'
            //   }
            // ])
            color: 'rgb(77, 119, 255)'
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: 'rgb(55, 162, 255)'
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        }
      ]
    }
  }

  mounted(): void {
    this.setOption()
  }
}
</script>
