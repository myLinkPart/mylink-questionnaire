const install = function (Vue) {
  const Bus = new Vue({
    data() {
      return {
        Q1Select: '',
      }
    }
  })
  Vue.prototype.$bus = Bus;
  window.$bus = Bus;
}
export default install;