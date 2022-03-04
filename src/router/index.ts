import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "../layout/index.vue";

Vue.use(VueRouter);

export const constantRoutes: RouteConfig[] = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: {
      title: "首页",
      icon: "clipboard",
      noCache: true,
    },
    children: [
      {
        path: "home",
        name: "Home",
        meta: {
          title: "Home",
          icon: "clipboard",
          noCache: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/dashboard/index.vue"),
      },
      {
        path: "formComponent",
        name: "FormComponent",
        meta: {
          title: "Form表单",
          icon: "form",
          noCache: true,
        },
        component: () =>
          import(/* webpackChunkName: "FormComponent" */ "../views/FormComponent.vue"),
      },
    ],
  },
  {
    path: "/table",
    component: Layout,
    meta: {
      title: "table",
      icon: "table",
      noCache: true,
    },
    children: [
      {
        path: "table",
        name: "ScrollTable",
        meta: {
          title: "table滚动加载",
          icon: "table",
          noCache: true,
        },
        component: () =>
          import(/* webpackChunkName: "scrollTable" */ "../views/table/scrollTable.vue"),
      },
    ],
  },
];

export const asyncRoutes: RouteConfig[] = [];

const createRouter = () =>
  new VueRouter({
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    },
    // base: process.env.BASE_URL,
    routes: constantRoutes,
  });

const router = createRouter();

export default router;
