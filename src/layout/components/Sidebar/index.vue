<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppModule } from "@/store/modules/app";
import { PermissionModule } from "@/store/modules/permission";
import variables from "@/styles/_variables.scss";
import SidebarItem from "./SidebarItem.vue";
import { RouteConfig } from "vue-router";
@Component({
  name: "Sidebar",
  components: {
    SidebarItem,
  },
})
export default class extends Vue {
  // 计算属性
  get activeMenu(): string {
    const route = this.$route;
    const { meta, path } = route;
    if (meta && meta.activeMenu) {
      return meta.activeMenu;
    } else {
      return path;
    }
  }

  //从store中取
  get sidebar(): { [k: string]: boolean } {
    return AppModule.sidebar;
  }

  get routes(): RouteConfig[] {
    return PermissionModule.routes;
  }
  get isCollapse(): boolean {
    return !this.sidebar.opened;
  }
  // variables
  get variables(): { [propName: string]: any }{
    return variables;
  }
  get menuActiveTextColor(): string {
    return variables.menuActiveText;
  }
}
</script>
<style lang="scss">
.sidebar-container {
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }

  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__view {
    height: 100%;
  }

  .el-scrollbar__bar {
    &.is-vertical {
      right: 0px;
    }

    &.is-horizontal {
      display: none;
    }
  }
}
</style>
