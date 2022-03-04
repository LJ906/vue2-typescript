<template>
  <div class="dashboard-editor-container">
    <panel-group></panel-group>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PanelGroup from './components/PanelGroup.vue'
@Component ({
  components: {
    PanelGroup
  }
})
export default class ClassName extends Vue {

}
</script>
<style scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color:rgb(240, 242, 245);
  position: relative;
}
</style>
