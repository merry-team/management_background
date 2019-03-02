import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Form, FormItem, Input, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./plugins/element.js";

Vue.config.productionTip = false;
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
