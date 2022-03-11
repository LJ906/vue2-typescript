// import router from './router'
// import { Route } from 'vue-router'
import { PermissionModule } from '@/store/modules/permission'

// 角色写死admin
const userRole = ['admin']
// 根据角色获取权限路由
PermissionModule.GenerateRoutes(userRole)
// router.beforeEach(async (to: Route, from: Route, next: any) => {

// })