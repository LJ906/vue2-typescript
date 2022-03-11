import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import { RouteConfig } from "vue-router";
import { asyncRoutes, constantRoutes } from "@/router";

const hasPermission = (roles: string[], route: RouteConfig) => {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      return route.meta && route.meta.roles.includes(role);
    });
  } else {
    return true;
  }
};

// 筛选有选线的路由
export const filterAsyncRoutes = (routes: RouteConfig[], roles: string[]): RouteConfig[] => {
  const res: RouteConfig[] = [];
  routes.forEach((route) => {
    const r = { ...route };
    if (hasPermission(roles, r)) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles);
      }
      res.push(r);
    }
  });
  return res;
};

export interface IPermissionState {
  routes: RouteConfig[];
  dynamicRoutes: RouteConfig[];
}

@Module({ dynamic: true, store, name: "permission" })
class Permission extends VuexModule implements IPermissionState {
  public routes: RouteConfig[] = []; // 所有路由集合
  public dynamicRoutes: RouteConfig[] = []; // 权限路由

  // 合并动态 路由
  @Mutation
  private SET_ROUTES(routes: RouteConfig[]) {
    this.routes = constantRoutes.concat(routes);
    this.dynamicRoutes = routes;
  }
  // 根据用户角色获取权限路由
  @Action
  public GenerateRoutes(roles: string[]) {
    let accessedRoutes;
    if (roles.includes("admin")) {
      accessedRoutes = asyncRoutes;
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
    }

    this.SET_ROUTES(accessedRoutes);
  }
}

export const PermissionModule = getModule(Permission);
