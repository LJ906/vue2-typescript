<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[
      isCollapse ? 'simple-mode' : 'full-mode',
      { 'first-level': isFirstLevel },
    ]"
  >
    <!-- 没有子目录 -->
    <template
      v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children"
    >
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': isFirstLevel }"
        >
          <svg-icon
            v-if="theOnlyOneChild.meta.icon"
            :name="theOnlyOneChild.meta.icon"
          />
          <span v-if="theOnlyOneChild.meta.title" slot="title">{{
            theOnlyOneChild.meta.title
          }}</span>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 子路由的 -->
    <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :name="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{
          item.meta.title
        }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>
<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// import path from "path";
import { Component, Vue, Prop } from "vue-property-decorator";
import { RouteConfig } from "vue-router";
import { isExternal } from "@/utils/validate";
import SidebarItemLink from "./SidebarItemLink.vue";
@Component({
  name: "SidebarItem",
  components: {
    SidebarItemLink,
  },
})
export default class extends Vue {
  @Prop({ required: true }) item!: RouteConfig;
  @Prop({ default: false }) isCollapse!: boolean;
  @Prop({ default: true }) isFirstLevel!: boolean;
  @Prop({ default: "" }) basePath!: string;

  // 显示根目录
  get alwaysShowRootMenu(): boolean {
    return this.item.meta && this.item.meta.isAlwaysShow ? true : false;
  }

  get showingChildNumber(): number {
    if (this.item.children) {
      const showingChildren = this.item.children.filter((item) => {
        if (item.meta && item.meta.hidden) {
          return false;
        } else {
          return true;
        }
      });
      return showingChildren.length;
    }
    return 0;
  }

  get theOnlyOneChild(): null | RouteConfig {
    if (this.showingChildNumber > 1) {
      return null;
    }
    // 一个children || 没有children
    if (this.item.children) {
      for (const child of this.item.children) {
        if (!child.meta || !child.meta.hidden) {
          return child;
        }
      }
    }
    // If there is no children, return itself with path removed,
    // because this.basePath already conatins item's path information
    return { ...this.item, path: "" };
  }

  // 格式化path, 以basePath为基础重置路径
  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>
<style lang="scss">
@import "../../../styles/_variables.scss";
.el-submenu.is-active > .el-submenu__title {
  color: $subMenuActiveText !important;
}
.el-scrollbar,.el-scrollbar__view,.el-menu {
  height: 100%;
}
.full-mode {
  .nest-menu .el-submenu>.el-submenu__title,
  .el-submenu .el-menu-item {
    min-width: $sideBarWidth !important;
    background-color: $subMenuBg !important;

    &:hover {
      background-color: $subMenuHover !important;
    }
  }
}

.simple-mode {
  &.first-level {
    .submenu-title-noDropdown {
      padding: 0 !important;
      position: relative;

      .el-tooltip {
        padding: 0 !important;
      }
    }

    .el-submenu {
      overflow: hidden;

      &>.el-submenu__title {
        padding: 0px !important;

        .el-submenu__icon-arrow {
          display: none;
        }

        &>span {
          visibility: hidden;
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.svg-icon {
  margin-right: 16px;
}

.simple-mode {
  .svg-icon {
    margin-left: 20px;
  }
}
</style>
