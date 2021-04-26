<template>
  <div class="com-status">
    <div class="content">
      <img  v-if="status === 'fail'" :src="require('../../static/img/failure.png')" alt="" >
      <img  v-if="status === 'success'" :src="require('../../static/img/failure.png')" alt="" >
      <p></p>
      <p></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComStatus',
  props: {
    status: {
      type: String,
      default: 'fail'
    }
  },
  data() {
    return {

    }
  }

}
</script>

<style lang="scss" scoped>

</style>