import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { getParam } from "@common/handle.js";
import { get, post } from '@utils/fetch';
import '@utils/wx';
Vue.prototype.$get = get;
Vue.prototype.$post = post;

import "../static/js/rem.js";
import "../static/css/reset.css";
import "../static/css/common.scss";
import i18n from "@tools/i18n"; // 国际化

import Vconsole from "vconsole"; // Vconsole 配置

if (process.env.NODE_ENV !== "production" || window.location.href.indexOf('debug=true') > -1) {
    let vConsole = new Vconsole();
    Vue.use(vConsole);
}

import VueClipboard from "vue-clipboard2"; // 复制到粘贴板插件
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

import { Uploader } from 'vant';
import 'vant/lib/index.css';
Vue.use(Uploader);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    let lang = getParam("lang");
    if (lang === 'sc' || lang === 'en' || lang === 'tc') {
        sessionStorage.setItem("lang", lang);
    }
    switch (sessionStorage.getItem('lang')) {
        case 'sc':
            document.title = to.meta.titleZh;
            i18n.locale = 'sc'
            break;
        case 'en':
            document.title = to.meta.titleEn;
            i18n.locale = 'en'
            break;
        case 'tc':
            document.title = to.meta.titleTw;
            i18n.locale = 'tc'
            break;
    }
    next();
});

Vue.prototype.$wxsdk.getWxConfig();

new Vue({
    router,
    i18n, //挂载i18n
    render: h => h(App)
}).$mount('#app')