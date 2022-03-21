<template>
  <div class="custom-dragbox" draggable="true">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {}
</script>
<style scoped>
.custom-dragbox {
  position: fixed;
  top: 80%;
  right: 0px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  background-color: rgb(46, 192, 27);
  cursor: move;
  z-index: 9999;
}
</style>
