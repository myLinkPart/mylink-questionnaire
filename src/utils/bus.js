const install = function (Vue) {
  const Bus = new Vue({
    data() {
      return {
        Q1Select: '',
      }
    },
    computed: {
      // 是否是满意
      satisfy() {
        return [4,5].includes(this.$bus.Q1Select);
      }
    }
  })
  Vue.prototype.$bus = Bus;
  window.$bus = Bus;
}
export default install;