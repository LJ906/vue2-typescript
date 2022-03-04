import { Component, Vue, Watch } from "vue-property-decorator";
import { AppModule, DeviceType } from "@/store/modules/app";

const WIDTH = 992; //区分desk 和mobile的大小
@Component({
  name: "ResizeMixin",
})
export default class extends Vue {
  get device(): DeviceType {
    return AppModule.device;
  }
  get sidebar() {
    return AppModule.sidebar;
  }

  // 监听路由
  @Watch("$route")
  private onRouteChange() {
    // mobile + 侧边栏
    if (this.device === DeviceType.Mobile && AppModule.sidebar.opened) {
      AppModule.CloseSideBar(false);
    }
  }

  // 判断是mobile的标准
  private isMobile(): boolean {
    // 获取页面的宽度和 WIDTH比较
    const rect = document.body.getBoundingClientRect();
    return rect.width - 1 < WIDTH; // MOBILE的宽度标准
  }

  // 页面resize
  // 1. 判断device : deskTop,mobile，并更新store/app
  // 2. mobile: 关闭sidebar
  resizeHandler(): void {
    if (!document.hidden) {
      const isMobile = this.isMobile();
      AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
      if (isMobile) {
        AppModule.CloseSideBar(true);
      }
    }
  }

  beforeMount(): void {
    window.addEventListener("resize", this.resizeHandler);
  }

  mouted(): void {
    const isMobile: boolean = this.isMobile();
    if (isMobile) {
      AppModule.ToggleDevice(DeviceType.Mobile);
      AppModule.CloseSideBar(true);
    }
  }
  beforeDestory(): void {
    window.removeEventListener("resize", this.resizeHandler);
  }
}
