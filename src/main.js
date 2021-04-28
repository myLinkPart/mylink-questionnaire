import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { get, post } from '@utils/fetch';
import VueBus from '@utils/bus';
import { preventReClick } from '@utils/plugins';
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.use(VueBus);
Vue.use(preventReClick);

import "../static/js/rem.js";
import "../static/css/reset.css";
import "../static/css/common.scss";
import i18n from "@tools/i18n"; // 国际化

import Vconsole from "vconsole"; // Vconsole 配置

if (process.env.VUE_APP_ENV_REAL !== "production" || window.location.href.indexOf('debug=true') > -1) {
    let vConsole = new Vconsole();
    Vue.use(vConsole);
}

import VueClipboard from "vue-clipboard2"; // 复制到粘贴板插件
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import 'vant/lib/index.css';

Vue.config.productionTip = false;

new Vue({
    router,
    i18n, //挂载i18n
    render: h => h(App)
}).$mount('#app')