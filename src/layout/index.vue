<template>
  <div class="app-wrapper" :class="classObj">
    <navbar></navbar>
    <!-- mobile时的菜单外面的遮罩层点击遮罩层关闭sidebar -->
    <div
      v-if="classObj.mobile && sidebar.opened"
      class="drawer-bg"
      @click="hanldeClickOutSide"
    />
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { DeviceType, AppModule } from "@/store/modules/app";

import { Sidebar, AppMain, Navbar } from "./components";
import ResizeMixin from "./mixin/resize";
@Component({
  name: "Layout",
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
})
export default class extends mixins(ResizeMixin) {
  get classObj(): {
    hideSidebar: boolean;
    openSidebar: boolean;
    withoutAnimation: boolean;
    mobile: boolean;
  } {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    };
  }

  hanldeClickOutSide(): void {
    AppModule.CloseSideBar(false);
  }




}
</script>
<style lang="scss" scoped>
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  // min-height: 100%;
  min-height: calc(100% - $navHeight);
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
  top: $navHeight;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 60px;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar {
  .main-container {
    margin-left: 54px;
  }

  .sidebar-container {
    width: 54px !important;
  }

  .fixed-header {
    width: calc(100% - 54px);
  }
}

/* for mobile response 适配移动端 */
.mobile {
  .main-container {
    margin-left: 0px;
  }

  .sidebar-container {
    transition: transform 0.28s;
    width: $sideBarWidth !important;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(-$sideBarWidth, 0, 0);
    }
  }

  .fixed-header {
    width: 100%;
  }
}

.withoutAnimation {
  .main-container,
  .sidebar-container {
    transition: none;
  }
}
</style>
