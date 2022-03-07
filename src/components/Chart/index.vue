<template>
  <div :id="id" :ref="id" :style="{ height: height, width: width }" />
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import ResizeMixin from './mixin/resize'

@Component({
  name: 'BaseChart'
})
export default class extends mixins(ResizeMixin) {
  @Prop({ default: 'chart' }) private className!: string
  @Prop({ default: 'chart' }) private id!: string
  @Prop({ default: '100%' }) private width!: string
  @Prop({ default: '100%' }) private height!: string
  @Prop() private option!: EChartsOption

  mounted(): void {
    console.log('option', this.option)

    this.$nextTick(() => {
      this.initChart()
    })
  }

  beforeDestroy(): void {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  }

  private initChart() {
    this.chart = echarts.init(
      document.getElementById(this.id) as HTMLDivElement
    )
    this.chart.setOption(this.option)
    this.chart.on('click', (params) => {
      this.$emit('click', params)
    })
    this.chart.on('legendselectchanged', (params) => {
      this.$emit('legendselectchanged', params)
    })
  }

  @Watch('option', { deep: true })
  reRenderChart(newVal: EChartsOption): void {
    this.chart?.setOption(newVal)
  }
}
</script>
