import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./style/initialize.css";
// import './config/rem.js';
import axios from "./config/https.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as dd from "dingtalk-jsapi";
import "./style/common.less";
import "./style/home.less";
import "./style/project.less";
import "./style/basicInfo.less";
import "./style/system.less";
import "./style/task.less";
import "./style/diary.less";
import utils from "./config/util.js";
import IntroJs from "intro.js";
import "intro.js/introjs.css";

// iconfont
import "./assets/iconfont/iconfont.css";

// datav
import dataV from "@jiaminghi/data-view";

Vue.use(dataV);
import {
  borderBox1,
  borderBox7,
  borderBox8,
  decoration5,
  decoration7
} from "@jiaminghi/data-view";
Vue.config.productionTip = false;
Vue.use(borderBox1);
Vue.use(borderBox7);
Vue.use(borderBox8);
Vue.use(decoration5);
Vue.use(decoration7);

Vue.use(IntroJs);
Vue.prototype.$utils = utils;
Vue.prototype.$axios = axios;
// Vue.config.productionTip = false;
Vue.prototype.$dd = dd;
// axios.defaults.baseURL = window.domain;
console.log(window.domain);

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
