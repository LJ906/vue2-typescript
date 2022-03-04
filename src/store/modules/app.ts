import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
import store from "@/store";
import { getSize, setSidebarStatus, setSize } from "@/utils/cookies";

export enum DeviceType {
  Mobile,
  Desktop,
}

// 声明 app state 类型
export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  language: string;
  size: string;
}

@Module({ dynamic: true, store, name: "app" })
class App extends VuexModule implements IAppState {
  // state
  public device = DeviceType.Desktop;
  public sidebar = {
    opened: true,
    withoutAnimation: false,
  };
  public language = "ZH";
  public size = getSize() || "medium";

  // mutations
  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean): void {
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
    // 记录折叠 状态
    if (this.sidebar.opened) {
      setSidebarStatus("opend");
    } else {
      setSidebarStatus("closed");
    }
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
    setSidebarStatus("closed");
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }

  @Mutation
  private SET_LANGUAGE(language: string) {
    this.language = language;
  }

  @Mutation
  private SET_SIZE(size: string) {
    this.size = size;
    setSize(this.size);
  }

  // actions
  @Action
  public ToggleSidebar(withoutAnimation: boolean): void {
    this.TOGGLE_SIDEBAR(withoutAnimation);
  }

  @Action
  public CloseSideBar(withoutAnimation: boolean): void {
    this.CLOSE_SIDEBAR(withoutAnimation);
  }

  @Action
  public ToggleDevice(device: DeviceType): void {
    this.TOGGLE_DEVICE(device);
  }

  @Action
  public SetLanguage(language: string): void {
    this.SET_LANGUAGE(language);
  }

  @Action
  public SetSize(size: string): void {
    this.SET_SIZE(size);
  }
}

export const AppModule = getModule(App);
