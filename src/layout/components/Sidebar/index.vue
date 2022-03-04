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
        <!-- <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="/">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item> -->

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
// import { PermissionModule } from "@/store/modules/permission";
import variables from "@/styles/_variables.scss";
import SidebarItem from "./SidebarItem.vue";
import { RouteConfig } from "vue-router";
import { constantRoutes } from "@/router/index";
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
    // return PermissionModule.routes;
    return constantRoutes; // 暂定
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
