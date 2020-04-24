<template>
  <div class="page-wrp">
    <div class="btn-wrp">
      <h1>不同大小的按钮</h1>
      <UiButton @click="onButtonClick" size="large">large</UiButton>
      <UiButton @click="onButtonClick" size="medium">medium</UiButton>
      <UiButton @click="onButtonClick" size="small">small</UiButton>
      <UiButton @click="onButtonClick" size="mini">mini</UiButton>
    </div>
    <div class="btn-wrp">
      <h1>不同形状的按钮</h1>
      <UiButton @click="changeRidus" size="large" round>round</UiButton>
      <hr />
      <UiButton @click="changeRidus" round>to半圆</UiButton>
      <UiButton @click="changeRidus" circle>to圆形</UiButton>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UiButton from '@/components/UiKit/UiButton.vue'
@Component({
  components: {
    UiButton
  }
})
export default class UiButtons extends Vue {
  private radius?: string

  onButtonClick(event: MouseEvent) {
    console.log('clickle', event)
  }

  changeRidus(radius: string) {
    this.radius = radius
  }
}
</script>
<style scoped>
.btn-wrp {
  margin: 30px;
}
</style>
