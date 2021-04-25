import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {getQueryVariable} from "../common/js/handle.js";
Vue.use(VueI18n)

let lang = getQueryVariable('lang') || window.sessionStorage.getItem('lang')

if (!lang) {
  lang = 'sc'
}

window.sessionStorage.setItem('lang', lang)
console.log('lang', lang)

// 以下为语言包单独设置的场景，单独设置时语言包需单独引入
const messages = {
  'sc': require('@assets/i18n/zh'),       // 中文语言包
  'en': require('@assets/i18n/en'),       // 英文语言包
  'tc': require('@assets/i18n/tw')        // 繁体语言包
}

// 最后 export default，这一步肯定要写的。
export default new VueI18n({
  locale : lang, 
  messages : messages // set locale messages
})