export default {
  data() {
    return {};
  },
  languageType() {
    return sessionStorage.getItem("lang");
  },
  methods: {
    // 去"我的积分"页面
    toMyPoints() {
      window.location.href = `${process.env.VUE_APP_BASE_MLINKURL}/mylink/#/integral/points?lang=${window.sessionStorage.getItem("lang")}`;
    },
  }
}