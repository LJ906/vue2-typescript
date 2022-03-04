<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="isKeepAlive">
        <router-view :key="key"></router-view>
      </keep-alive>
      <router-view v-else :key="key"></router-view>
    </transition>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppMain'
})
export default class ClassName extends Vue {
  get key(): string {
    return this.$route.path
  }

  get isKeepAlive(): boolean {
    return this.$route.meta && !this.$route.meta.noCache ? true : false
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
