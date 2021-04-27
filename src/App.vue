<template>
	<div id="app">
		<router-view/>
	</div>
</template>
<script>
import Vue from "vue";
import i18n from "@tools/i18n"; // 国际化
import { Toast } from "vant";
import router from "./router";
import { getParam, isApp, getUserInfo } from "@common/handle.js";

router.beforeEach((to, from, next) => {
  // 多语言
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

  if(isApp()) {
    // 在app内获取真实用户信息
     getUserInfo((obj) => {
      obj = obj ? obj : {};
      // 缓存中是否有jwt,以及app中的token与h5端缓存的token是否相等，不相等的情况下要进行登陆获取
      let isLogin = !localStorage.getItem("jwt_questionnaire") || obj.authorization !== JSON.parse(localStorage.getItem("userInfo") || "{}").authorization;
      if(isLogin){
        localStorage.setItem("userInfo", JSON.stringify(obj));
        Vue.prototype.$post("/user/login/", {
          token: JSON.parse(localStorage.getItem("userInfo")).authorization
        }).then(res => {
          if (+res.code === 0) {
            localStorage.setItem("jwt_questionnaire", res.data.jwt);
            next();
          } else {
            Toast.fail({
              duration: 3500,
              message: 'login error'
            });
            next();
          }
        }).catch(error => {
          next();
          console.log(error);
          Toast.fail({
            duration: 3500,
            message: 'login error'
          })
        })
      }
    });
  } else {
    next();
  }
})

export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '../static/css/base.scss';
</style>
