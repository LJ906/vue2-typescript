import Vue from "vue";

import "normalize.css";
import ElementUI from "element-ui";
import SvgIcon from "vue-svgicon";
import "@/styles/element-variables.scss";
import "@/styles/index.scss";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入svg icon
import '@/icons/components'
Vue.use(ElementUI, {
  size: "middle",
  // size: AppModule.size, // Set element-ui default size
  // i18n: (key: string, value: string) => i18n.t(key, value)
});

Vue.use(SvgIcon, {
  tagName: "svg-icon",
  defaultWidth: "1em",
  defaultHeight: "1em"
})
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
