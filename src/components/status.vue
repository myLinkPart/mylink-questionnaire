<template>
  <div class="com-status">
    <div class="content">
      <div class="img">
        <img v-if="status === 'fail'" :src="require('../../static/img/failure.png')" alt="" >
        <img v-if="status === 'success'" :src="require('../../static/img/success.png')" alt="" >
      </div>
      <p class="title">{{ status === 'fail'? '提交失败!': '提交成功' }}</p>
      <p class="sub">{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComStatus',
  props: {
    status: {
      type: String,
      default: 'success'
    },
    msg: {
      type: String,
      default: '絡網延遲或不可預期的錯誤，請返回重試。'
    }
  },
  data() {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>
.com-status {
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .img{
    width: 120px * $scale;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .title {
    font-size: 0.2rem;
    text-align: center;
    margin: 47px * $scale 0 10px * $scale 0;
  }
  .sub {
    font-size: 0.12rem;
    color: rgba(0, 0, 0, 0.4);
    text-align: center;
  }
}
</style>